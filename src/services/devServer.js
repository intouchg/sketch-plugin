import ChildProcess from '../ChildProcess'

const DEV_SERVER_URL = 'http://localhost:3000/'

let devServerProcess = null

export const stopDevServer = () => devServerProcess && devServerProcess.stop()

export const openDevServer = (selectedProjectDirectory) => {
	if (!devServerProcess) {
		try {
			const onError = (error) => {
				console.error(error)
				throw Error('Failed to start dev server: ' + error)
			}

			let hasOpenedBrowser = false

			const onStdOut = (data) => {
				if (!hasOpenedBrowser) {
					// eslint-disable-next-line
					NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(DEV_SERVER_URL))
					hasOpenedBrowser = true
				}
			}

			const onStdErr = (data) => console.log('Dev server stderr: ', data.toString())

			devServerProcess = new ChildProcess(`cd ${selectedProjectDirectory} && npm run dev`, { onError, onStdOut, onStdErr })
		}
		catch (error) {
			throw Error('Failed to start dev server process: ' + error)
		}
	}
	else if (devServerProcess) {
		if (!devServerProcess.running) {
			devServerProcess.start()
		}

		try {
			// eslint-disable-next-line
			NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(DEV_SERVER_URL))
		}
		catch (error) {
			stopDevServer()
			throw Error('Error opening dev server URL in browser: ' + error)
		}
	}
}
