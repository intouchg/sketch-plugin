import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import UI from 'sketch/ui'
// import { toArray } from 'util'
import { stopDevServer, stopStorybook } from './services'
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

export default () => {
	const browserWindow = new BrowserWindow(WINDOW_OPTIONS)
	browserWindow.once('ready-to-show', () => browserWindow.show())
	const webContents = browserWindow.webContents
	webContents.on('nativeLog', (message) => UI.message(message))

	const showError = (message) => webContents.executeJavaScript(`window.displayMessage(${JSON.stringify({ type: 'error', message })})`)

	const state = {
		selectedProjectDirectory: null,
		themeFilepaths: {},
		themeData: {},
	}

	browserWindow.on('closed', () => {
		stopDevServer()
		stopStorybook()
	})

	// The "clientCommand" event listener listens for commands sent from the webview front end to the Sketch back end
	webContents.on('clientCommand', async (data) => {
		const { commandId, type, payload } = JSON.parse(data)
		let result = {}

		try {
			result = await api[type](state, payload)
		}
		catch (error) {
			showError(String(error))
			result = { error: String(error) }
		}

		webContents.executeJavaScript(`window.resolveCommand(${JSON.stringify({ commandId, result })})`)
	})

	// The "resolveCommand" event listener resolves commands send from the Sketch back end to the webview front end
	webContents.on('resolveCommand', () => {})

	browserWindow.loadURL(require('../resources/webview.html'))
}

export const onShutdown = () => {
	const webview = getWebview(WEBVIEW_IDENTIFIER)

	if (webview) {
		webview.close()
	}
}

export const onOpenDocument = (context) => setTimeout(api.getSketchDocumentNames, 500)

export const onCloseDocument = (context) => setTimeout(api.getSketchDocumentNames, 500)

export const onSelectionChanged = (context) => {
	const action = context.actionContext
	console.log(action)
	// const document = fromNative(action.document)
	// const selection = action.newSelection
	// const selectionArray = toArray(action.newSelection)
	// UI.message(selection, document)
}
