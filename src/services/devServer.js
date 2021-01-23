import ChildProcess from '../ChildProcess'

const DEV_SERVER_URL = 'http://localhost:3000/'

let devServerProcess = null

export const stopDevServer = () => {
	if (devServerProcess) {
		devServerProcess.stop()
		devServerProcess = null
	}
}

const startDevServer = (directory) => new Promise((resolve, reject) => {
	if (devServerProcess) {
		console.error('Attempted to start dev server while devServerProcess already exists')
		return
	}

	try {
		const onStdErr = (data) => {
			const output = data.toString()

			if (output.includes('missing script') || output.includes('command not found')) {
				reject('missing dependencies')
			}
		}

		const onStdOut = (data) => {
			const output = data.toString()

			if (output.includes('started server') || output.includes('compiled successfully')) {
				resolve(true)
			}
		}

		const onError = (error) => {
			throw Error('Dev server process error: ' + error)
		}

		devServerProcess = new ChildProcess(`cd ${directory} && npm run dev`, { onError, onStdErr, onStdOut })
	}
	catch (error) {
		stopDevServer()
		throw Error('Failed to start dev server: ' + error)
	}
})

export const openDevServer = async (selectedProjectDirectory) => {
	try {
		if (!devServerProcess) {
			await startDevServer(selectedProjectDirectory)
			// eslint-disable-next-line
			NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(DEV_SERVER_URL))
		}
		else {
			if (!devServerProcess.running) {
				devServerProcess.start()
			}

			// eslint-disable-next-line
			NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(DEV_SERVER_URL))
		}
	}
	catch (error) {
		stopDevServer()
		throw Error('Failed to open dev server: ' + error)
	}
}
