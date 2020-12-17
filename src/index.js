import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import UI from 'sketch/ui'
import { getDocuments } from 'sketch'
// import { toArray } from 'util'
import { stopDevServer, stopStorybook } from './services'
import {
	selectLocalProject,
	getRecentProjects,
	getSystemFonts,
	selectNewProjectDirectory,
	openBrowserWindow,
	openDevServer,
	openStorybook,
	saveThemeData,
	loginToAzure,
	getAzureCredentials,
	forgetAzureCredentials,
	getAzureGitRepos,
	cloneAzureGitRepo,
	extractSketchDocumentStyles,
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

	let selectedProjectDirectory = null
	let themeFilepaths = {}
	let themeData = {}

	browserWindow.on('closed', () => {
		stopDevServer()
		stopStorybook()
	})

	webContents.on('selectLocalProject', (recentProject) => {
		const filepath = recentProject ? recentProject.filepath : null
		const results = selectLocalProject(webContents, showError, filepath)
		selectedProjectDirectory = results.selectedProjectDirectory
		themeFilepaths = results.themeFilepaths
		themeData = results.themeData
	})

	webContents.on('getRecentProjects', () => getRecentProjects(webContents, showError))

	webContents.on('getSystemFonts', () => getSystemFonts(webContents, showError))

	webContents.on('getSketchDocumentNames', () => updateSketchDocumentNames(webContents))

	webContents.on('selectNewProjectDirectory', () => selectNewProjectDirectory(webContents, showError))

	webContents.on('openBrowserWindow', (url) => openBrowserWindow(showError, url))

	webContents.on('openDevServer', () => openDevServer(webContents, showError, selectedProjectDirectory))

	webContents.on('openStorybook', () => openStorybook(webContents, showError, themeData))

	webContents.on('saveThemeData', (newThemeData) => saveThemeData(webContents, showError, newThemeData, themeFilepaths))

	webContents.on('loginToAzure', (credentialsData) => loginToAzure(webContents, showError, credentialsData))

	webContents.on('getAzureCredentials', () => getAzureCredentials(webContents, showError))

	webContents.on('forgetAzureCredentials', () => forgetAzureCredentials(webContents, showError))

	webContents.on('getAzureGitRepos', (credentialsData) => getAzureGitRepos(webContents, showError, credentialsData))

	webContents.on('cloneAzureGitRepo', (selectedRepoData) => cloneAzureGitRepo(webContents, showError, selectedRepoData))

	webContents.on('extractSketchDocumentStyles', (sketchDocumentIndex) => {
		const sketchDocuments = (getDocuments() || []).filter((document) => document.path)
		extractSketchDocumentStyles(webContents, showError, sketchDocuments[sketchDocumentIndex])
	})

	browserWindow.loadURL(require('../resources/webview.html'))
}

export const onShutdown = () => {
	const webview = getWebview(WEBVIEW_IDENTIFIER)

	if (webview) {
		webview.close()
	}
}

export const onOpenDocument = (context) => setTimeout(updateSketchDocumentNames, 500)

export const onCloseDocument = (context) => setTimeout(updateSketchDocumentNames, 500)

export const onSelectionChanged = (context) => {
	const action = context.actionContext
	console.log(action)
	// const document = fromNative(action.document)
	// const selection = action.newSelection
	// const selectionArray = toArray(action.newSelection)
	// UI.message(selection, document)
}
