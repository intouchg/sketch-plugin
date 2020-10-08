import ChildProcess from './ChildProcess'

let serverProcess = null

export const stopAuthServer = () => serverProcess && serverProcess.stop()

export const startAuthServer = (port, webContents, displayErrorInWebview) => {
	const onClose = () => {
		// webContents.executeJavaScript('window.doStuff()')
	}

	const onError = (error) => displayErrorInWebview(`Could not start MSALServer auth server: ${error}`)

	serverProcess = new ChildProcess(`node ./Contents/Sketch/msal-server/msal-server-cli.cjs.js ${port}`, { onClose, onError })
}
