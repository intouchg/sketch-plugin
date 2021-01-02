import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import UI from 'sketch/ui'
// import { toArray } from 'util'
import { stopDevServer, stopStorybook } from './services'
import { updateSketchDocumentNames } from './clientApi'
import * as api from './messages'

export const WEBVIEW_IDENTIFIER = 'intouch-design-system.webview'

const WINDOW_OPTIONS = {
	identifier: WEBVIEW_IDENTIFIER,
	width: 1200,
	height: 1080,
	show: false,
	hidesOnDeactivate: false,
	remembersWindowFrame: true,
}

// TO DO: Fix git service (should not use webContents.executeJavaScript)

// TO DO: Remove these unused message types:
// cloneAzureGitRepo
// getAzureGitRepos
// openStorybook

// TO DO: Remove theme unused services:
// storybook

export default () => {
	const browserWindow = new BrowserWindow(WINDOW_OPTIONS)
	browserWindow.once('ready-to-show', () => browserWindow.show())
	const webContents = browserWindow.webContents
	webContents.on('nativeLog', (message) => UI.message(message))

	const state = {
		selectedProjectDirectory: null,
		themeFilepaths: {},
		themeData: {},
	}

	browserWindow.on('closed', () => {
		stopDevServer()
		stopStorybook()
	})

	// Receives commands sent from the React webview front end to the Sketch plugin back end
	webContents.on('clientCommand', async (data) => {
		const { commandId, type, payload } = JSON.parse(data)
		let result = {}

		try {
			result = await api[type](state, payload)
		}
		catch (error) {
			console.error(error)
			result = { error: String(error) }
		}

		webContents.executeJavaScript(`window.resolveCommand(${JSON.stringify({ commandId, result })})`)
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
