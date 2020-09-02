import { spawn } from '@skpm/child_process'

let serverRunning = false
let serverProcess = null

export const killAuthServer = () => {
	if (serverProcess) {
		serverProcess.kill()
	}

	serverProcess = null
	serverRunning = false
}

export const startAuthServer = (port, webContents, displayErrorInWebview) => {
	try {
		serverRunning = true
		serverProcess = spawn('msal-server', [ port ], { shell: true, cwd: process.cwd() })

		serverProcess.on('error', (error) => {
			serverProcess = null
			serverRunning = false
			throw new Error('Error spawning new serverProcess: ', error)
		})

		serverProcess.stdout.on('data', (data) => console.log(data.toString('utf-8')))

		serverProcess.stderr.on('data', (data) => console.log(data.toString('utf-8')))

		serverProcess.on('close', (code) => {
			serverProcess = null
			serverRunning = false
			console.info('"serverProcess" child process exited with code ' + code)
			// webContents.executeJavaScript('window.doStuff()')
		})
	}
	catch (error) {
		displayErrorInWebview(`Could not start MSALServer auth server: ${error}`)
	}
}
