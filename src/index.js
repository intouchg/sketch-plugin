import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import UI from 'sketch/ui'
// import { toArray } from 'util'
import fs from '@skpm/fs'
import path from '@skpm/path'
import dialog from '@skpm/dialog'
import { configFilename, validateConfig } from '@i/theme'
import { AzureUserConnection } from '@i/azure'
import { openStorybook, stopStorybook, updateStorybookTempTheme } from './storybook'
import { cloneAzureGitRepo } from './git'
import { extractSketchDocumentStyles } from './extract'
import { startAuthServer } from './auth'

const WEBVIEW_IDENTIFIER = 'intouch-design-system.webview'
const AZURE_INSTANCE_URL = 'https://intazdoweb.intouchsol.com'
const OAUTH_SERVER_PORT = 8089

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

	// Stop the storybook process if the plugin browser window is closed
	browserWindow.on('closed', () => stopStorybook())

	webContents.on('selectGitRepo', () => {
		selectedProjectDirectory = dialog.showOpenDialogSync({ properties: [ 'openDirectory' ] })[0]

		if (selectedProjectDirectory) {
			let error = false
			const configFilepath = path.resolve(selectedProjectDirectory, configFilename)

			// Check for .idsconfig file
			if (!fs.existsSync(configFilepath)) {
				error = true
				displayErrorInWebview(`The folder you selected is not a valid Intouch Design System project. Could not locate a ${configFilename} config file at filepath: ${configFilepath}`)
			}

			const configData = fs.readFileSync(configFilepath).toString('utf-8')
			const config = validateConfig(JSON.parse(configData))

			if (!config) {
				error = true
				displayErrorInWebview(`Invalid format for ${configFilename} config file at filepath: ${configFilepath}`)
			}

			const filepaths = {
				values: config.values,
				groups: config.groups,
				components: config.components,
				variants: config.variants,
			}

			// Load each theme file referenced in the config file (except the "output" file) and populate themeData
			Object.keys(filepaths).forEach((key) => {
				const lowercaseKey = key.toLowerCase()
				const filepath = path.resolve(selectedProjectDirectory, config[key])

				if (!fs.existsSync(filepath)) {
					error = true
					displayErrorInWebview(`Could not locate theme ${key.toLowerCase()} file at filepath: ${filepath}`)
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
