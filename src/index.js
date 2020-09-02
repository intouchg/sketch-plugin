import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import UI from 'sketch/ui'
// import { toArray } from 'util'
import fs from '@skpm/fs'
import path from '@skpm/path'
import dialog from '@skpm/dialog'
import { IDSCONFIG_FILENAME } from '@i/theme'
import { AzureUserConnection } from '@i/azure'
import { parseEnv } from '@i/utility'
import { openStorybook, updateStorybookTempTheme, killStorybook } from './storybook'
import { cloneAzureGitRepo } from './git'
import { extractSketchDocumentStyles } from './extract'
import { startAuthServer } from './auth'

const WEBVIEW_IDENTIFIER = 'intouch-design-system.webview'
const AZURE_INSTANCE_URL = 'https://intazdoweb.intouchsol.com'
const OAUTH_SERVER_PORT = 8089

const THEME_VALUES_VALIDATION = {
	VALUES: 'Missing "VALUES" config option',
	GROUPS: 'Missing "GROUPS" config option',
	COMPONENTS: 'Missing "COMPONENTS" config option',
	SNIPPETS: 'Missing "SNIPPETS" config option',
}

const THEME_CONFIG_VALIDATION = {
	THEME_OUTPUT: 'Missing "THEME_OUTPUT" config option',
}

const IDSCONFIG_VALIDATION = {
	...THEME_VALUES_VALIDATION,
	...THEME_CONFIG_VALIDATION,
}

export default function () {
	const windowOptions = {
		identifier: WEBVIEW_IDENTIFIER,
		width: 1200,
		height: 1080,
		show: false,
		hidesOnDeactivate: false,
		remembersWindowFrame: true,
	}

	const browserWindow = new BrowserWindow(windowOptions)
	browserWindow.once('ready-to-show', () => browserWindow.show())

	const webContents = browserWindow.webContents
	webContents.on('nativeLog', (message) => UI.message(message))
	// webContents.on('did-finish-load', () => UI.message('UI loaded!'))

	const displayErrorInWebview = (message) => webContents.executeJavaScript(`window.displayError(${JSON.stringify(message)})`)

	let selectedProjectDirectory = null
	const themeFilepaths = {}
	const themeData = {}
	let azureConnection = null

	// Kill the storybook process if the plugin browser window is closed
	browserWindow.on('closed', () => killStorybook())

	webContents.on('selectGitRepo', () => {
		selectedProjectDirectory = dialog.showOpenDialogSync({ properties: [ 'openDirectory' ] })[0]

		if (selectedProjectDirectory) {
			let error = false
			const configFilepath = path.resolve(selectedProjectDirectory, IDSCONFIG_FILENAME)

			// Check for .idsconfig file
			if (!fs.existsSync(configFilepath)) {
				error = true
				displayErrorInWebview(`The folder you selected is not a valid Intouch Design System project. Could not locate an .idsconfig file at ${configFilepath} `)
			}

			const config = parseEnv(fs.readFileSync(configFilepath).toString('utf-8'))

			// Validate .idsconfig file
			for (const key in IDSCONFIG_VALIDATION) {
				if (!config.hasOwnProperty(key)) {
					error = true
					displayErrorInWebview(`The .idsconfig file at ${configFilepath} is not valid: ${IDSCONFIG_VALIDATION[key]}`)
				}
			}

			// Load each theme file referenced in .idsconfig and populate themeData
			Object.keys(THEME_VALUES_VALIDATION).forEach((key) => {
				const lowercaseKey = key.toLowerCase()
				const filepath = path.resolve(selectedProjectDirectory, config[key])

				if (!fs.existsSync(filepath)) {
					error = true
					displayErrorInWebview(`The folder you selected is not a valid Intouch Design System project. Could not locate theme ${key.toLowerCase()} file at ${filepath}`)
				}

				themeFilepaths[lowercaseKey] = filepath
				const fileData = fs.readFileSync(filepath)
				themeData[lowercaseKey] = JSON.parse(fileData)
			})

			// If all necessary config and files exist, call setThemeData in the React app
			if (!error) {
				webContents.executeJavaScript(`window.setThemeData(${JSON.stringify(themeData)})`)
				updateStorybookTempTheme(themeData)
			}
		}
	})

	webContents.on('openStorybook', () => {
		openStorybook(webContents, displayErrorInWebview)
		updateStorybookTempTheme(themeData)
	})

	webContents.on('saveThemeData', async (themeData) => {
		try {
			await Promise.all(Object.entries(themeData).map(async ([ key, value ]) => {
				fs.writeFileSync(themeFilepaths[key], JSON.stringify(value, null, '\t'))
			}))

			updateStorybookTempTheme(themeData)

			webContents.executeJavaScript('window.saveResult(true)')
			webContents.executeJavaScript('window.setSaveThemeDataResult(true)')
		}
		catch (error) {
			console.error('Error attempting to write plugin theme changes to the project\'s working directory: ', error)
			webContents.executeJavaScript('window.setSaveThemeDataResult(false)')
		}
	})

	webContents.on('getAzureGitRepos', async ({ username, accessToken }) => {
		try {
			if (!azureConnection) {
				azureConnection = new AzureUserConnection({
					instanceUrl: AZURE_INSTANCE_URL,
					username,
					accessToken,
					concurrency: 10,
				})
			}

			if (!azureConnection.lastGitRepoSync) {
				await azureConnection.getGitRepos()
			}

			const gitRepos = azureConnection.gitRepos.map(([ orgName, repos ]) => ([
				orgName,
				repos.sort(({ name: nameA }, { name: nameB }) => {
					const a = nameA.toLowerCase()
					const b = nameB.toLowerCase()
					return a > b ? 1 : (a < b ? -1 : 0)
				}),
			]))

			const sortedGitRepos = gitRepos.sort(([ nameA ], [ nameB ]) => {
				const a = nameA.toLowerCase()
				const b = nameB.toLowerCase()
				return a > b ? 1 : (a < b ? -1 : 0)
			})

			webContents.executeJavaScript(`window.setGitRepos(${JSON.stringify(sortedGitRepos)})`)
		}
		catch (error) {
			console.error(error)
			/* eslint-disable */
			azureConnection = null
			/* eslint-enable */
			webContents.executeJavaScript(`window.azureRequestError(${JSON.stringify(error)})`)
		}
	})

	webContents.on('cloneAzureGitRepo', async ({ remoteUrl }) => {
		let selectedCloneDirectory = null
		selectedCloneDirectory = dialog.showOpenDialogSync({ properties: [ 'openDirectory' ] })[0]

		if (selectedCloneDirectory) {
			await cloneAzureGitRepo(remoteUrl, selectedCloneDirectory, webContents, displayErrorInWebview)
		}
	})

	webContents.on('extractSketchDocumentStyles', async () => {
		try {
			const styles = extractSketchDocumentStyles()
			webContents.executeJavaScript(`window.receiveImportedSketchStyles(${JSON.stringify(styles)})`)
		}
		catch (error) {
			const message = `Error attempting to import Sketch document styles: ${error}`
			console.error(message)
			webContents.executeJavaScript('window.setSaveThemeDataResult(false)')
			displayErrorInWebview(message)
		}
	})

	webContents.on('startAuthServer', () => {
		startAuthServer(OAUTH_SERVER_PORT, webContents, displayErrorInWebview)
	})

	browserWindow.loadURL(require('../resources/webview.html'))
}

export function onShutdown () {
	const existingWebview = getWebview(WEBVIEW_IDENTIFIER)

	if (existingWebview) {
		existingWebview.close()
	}
}

export function onSelectionChanged (context) {
	const action = context.actionContext
	console.log(action)
	// const document = fromNative(action.document)
	// const selection = action.newSelection
	// const selectionArray = toArray(action.newSelection)
	// UI.message(selection, document)
}
