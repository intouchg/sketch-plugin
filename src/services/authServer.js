import ChildProcess from '../ChildProcess'

const ADAL_SERVER_LIB_FILEPATH = './Contents/Sketch/adal-server/cli.js'

let serverProcess = null

export const stopAuthServer = () => serverProcess && serverProcess.stop()

export const startAuthServer = (port, webContents, showError) => {
	const onClose = () => {
		// webContents.executeJavaScript('window.doStuff()')
	}

	const onError = (error) => showError(`Could not start ADALServer auth server: ${error}`)

	serverProcess = new ChildProcess(`node ${ADAL_SERVER_LIB_FILEPATH} ${port}`, { onClose, onError })
}
