import ChildProcess from '../ChildProcess'

const MSAL_SERVER_LIB_FILEPATH = './Contents/Sketch/msal-server/msal-server-cli.cjs.js'

let serverProcess = null

export const stopAuthServer = () => serverProcess && serverProcess.stop()

export const startAuthServer = (port, webContents, showError) => {
	const onClose = () => {
		// webContents.executeJavaScript('window.doStuff()')
	}

	const onError = (error) => showError(`Could not start MSALServer auth server: ${error}`)

	serverProcess = new ChildProcess(`node ${MSAL_SERVER_LIB_FILEPATH} ${port}`, { onClose, onError })
}
