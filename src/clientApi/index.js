import { getWebview } from 'sketch-module-web-view/remote'
import { WEBVIEW_IDENTIFIER } from '../index'

export * from './commands'

let webview = null

const clientCommands = {}
let commandId = 0

// Resolves a message sent from the Sketch plugin back end to the React webview front end
const resolveCommand = (data) => {
	const { commandId, result } = JSON.parse(data)
	const isError = typeof result === 'object' && result.hasOwnProperty('error')
	clientCommands[commandId][isError ? 'reject' : 'resolve'](isError ? result.error : result)
}

const initializeClientApi = () => {
	webview = getWebview(WEBVIEW_IDENTIFIER)
	webview.webContents.on('resolveCommand', resolveCommand)
}

// Sends a message from the Sketch plugin back end to the React webview front end
export const sendClientCommand = (type, payload) => {
	if (!webview) {
		initializeClientApi()
	}

	return new Promise((resolve, reject) => {
		clientCommands[commandId] = { resolve, reject }
		webview.webContents.executeJavaScript(`window.sketchCommand(${JSON.stringify({ commandId, type, payload })})`)
		commandId++
	})
}
