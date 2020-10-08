import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import UI from 'sketch/ui'
// import { toArray } from 'util'
import { stopStorybook } from './services'
import {
	selectGitRepo,
	openStorybook,
	saveThemeData,
	getAzureGitRepos,
	cloneAzureGitRepo,
	extractSketchDocumentStyles,
	startAuthServer,
} from './messages'

const WEBVIEW_IDENTIFIER = 'intouch-design-system.webview'

const WINDOW_OPTIONS = {
	identifier: WEBVIEW_IDENTIFIER,
	width: 1200,
	height: 1080,
	show: false,
	hidesOnDeactivate: false,
	remembersWindowFrame: true,
}

export default function () {
	const browserWindow = new BrowserWindow(WINDOW_OPTIONS)
	browserWindow.once('ready-to-show', () => browserWindow.show())
	const webContents = browserWindow.webContents
	webContents.on('nativeLog', (message) => UI.message(message))

	const displayErrorInWebview = (message) => webContents.executeJavaScript(`window.displayError(${JSON.stringify(message)})`)

	let themeFilepaths = {}
	let themeData = {}

	browserWindow.on('closed', () => stopStorybook())

	webContents.on('selectGitRepo', () => {
		const results = selectGitRepo(webContents, displayErrorInWebview)
		themeFilepaths = results.themeFilepaths
		themeData = results.themeData
	})

	webContents.on('openStorybook', () => openStorybook(webContents, displayErrorInWebview, themeData))

	webContents.on('saveThemeData', (newThemeData) => saveThemeData(webContents, displayErrorInWebview, newThemeData, themeFilepaths))

	webContents.on('getAzureGitRepos', (credentialsData) => getAzureGitRepos(webContents, displayErrorInWebview, credentialsData))

	webContents.on('cloneAzureGitRepo', (selectedRepoData) => cloneAzureGitRepo(webContents, displayErrorInWebview, selectedRepoData))

	webContents.on('extractSketchDocumentStyles', () => extractSketchDocumentStyles(webContents, displayErrorInWebview))

	webContents.on('startAuthServer', () => startAuthServer(webContents, displayErrorInWebview))

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
