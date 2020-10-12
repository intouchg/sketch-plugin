import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import UI from 'sketch/ui'
import { getDocuments, getSelectedDocument } from 'sketch'
// import { toArray } from 'util'
import { stopStorybook } from './services'
import {
	selectLocalProject,
	getRecentProjects,
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

const updateSketchDocumentNames = () => {
	const sketchDocuments = (getDocuments() || []).filter((document) => document.path)
	const webview = getWebview(WEBVIEW_IDENTIFIER)

	if (webview) {
		const documentNames = sketchDocuments.map(({ path }) => path.split('/').pop()).map((s) => decodeURI(s).split('.').slice(0, -1).pop())
		webview.webContents.executeJavaScript(`window.setSketchDocumentNames(${JSON.stringify(documentNames)})`)
	}
}

export default () => {
	const browserWindow = new BrowserWindow(WINDOW_OPTIONS)
	browserWindow.once('ready-to-show', () => browserWindow.show())
	const webContents = browserWindow.webContents
	webContents.on('nativeLog', (message) => UI.message(message))

	const showError = (message) => webContents.executeJavaScript(`window.displayError(${JSON.stringify(message)})`)

	let themeFilepaths = {}
	let themeData = {}

	browserWindow.on('closed', () => stopStorybook())

	webContents.on('selectLocalProject', (recentProject) => {
		const filepath = recentProject ? recentProject.filepath : null
		const results = selectLocalProject(webContents, showError, filepath)
		themeFilepaths = results.themeFilepaths
		themeData = results.themeData
	})

	webContents.on('getRecentProjects', () => getRecentProjects(webContents, showError))

	webContents.on('getSketchDocumentNames', () => updateSketchDocumentNames(webContents))

	webContents.on('openStorybook', () => openStorybook(webContents, showError, themeData))

	webContents.on('saveThemeData', (newThemeData) => saveThemeData(webContents, showError, newThemeData, themeFilepaths))

	webContents.on('getAzureGitRepos', (credentialsData) => getAzureGitRepos(webContents, showError, credentialsData))

	webContents.on('cloneAzureGitRepo', (selectedRepoData) => cloneAzureGitRepo(webContents, showError, selectedRepoData))

	webContents.on('extractSketchDocumentStyles', (sketchDocumentIndex) => {
		const sketchDocuments = (getDocuments() || []).filter((document) => document.path)
		extractSketchDocumentStyles(webContents, showError, sketchDocuments[sketchDocumentIndex])
	})

	webContents.on('startAuthServer', () => startAuthServer(webContents, showError))

	browserWindow.loadURL(require('../resources/webview.html'))
}

export const onShutdown = () => {
	const webview = getWebview(WEBVIEW_IDENTIFIER)

	if (webview) {
		webview.close()
	}
}

// TO DO: If this 1ms setTimeout isn't reliable, try sending message
// to the app, then when the app receives that message, request the
// new document names from the plugin
export const onOpenDocument = (context) => setTimeout(updateSketchDocumentNames, 1)

export const onCloseDocument = (context) => setTimeout(updateSketchDocumentNames, 1)

export const onSelectionChanged = (context) => {
	const action = context.actionContext
	console.log(action)
	// const document = fromNative(action.document)
	// const selection = action.newSelection
	// const selectionArray = toArray(action.newSelection)
	// UI.message(selection, document)
}
