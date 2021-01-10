import { spawn } from '@skpm/child_process'

/**
 * This doesn't always work perfectly... Sometimes stdout is not called.
 * Finding these bugs can be tricky as they are very inconsistent, so be careful...
 *
 * It seems like an issue with NodeJS, not with SKPM polyfills.
 * Possibly related to these issues:
 * 		https://github.com/skpm/child_process/issues/15
 * 		https://github.com/nodejs/node/issues/19218
 **/

export default class ChildProcess {

	constructor (
		processString,
		{
			onClose,
			onError,
			onStdOut,
			onStdErr,
		},
		disableLogging = false,
	) {
		this.process = null
		this.running = false
		this.disableLogging = disableLogging

		const processStrings = processString.split(' ')

		this.spawnArgs = [
			processStrings.shift(),
			processStrings,
			{ shell: true, cwd: process.cwd() },
		]

		this.onClose = onClose || function () {}
		this.onError = onError || function () {}
		this.onStdOut = onStdOut || function () {}
		this.onStdErr = onStdErr || function () {}

		this.start()
	}

	start () {
		try {
			this.running = true
			this.process = spawn(...this.spawnArgs)

			this.process.on('error', (error) => {
				this.process = null
				this.running = false

				throw Error('Failed to spawn new ChildProcess: ' + error)
			})

			this.process.stdout.on('data', (data) => {
				if (!this.disableLogging) {
					console.log(data.toString())
				}

				this.onStdOut(data)
			})

			this.process.stderr.on('data', (data) => {
				if (!this.disableLogging) {
					console.log(data.toString())
				}

				this.onStdErr(data)
			})

			this.process.on('close', (code) => {
				this.process = null
				this.running = false

				if (!this.disableLogging) {
					console.info('ChildProcess exited with code ' + code)
				}

				this.onClose(code)
			})
		}
		catch (error) {
			console.error(error)
			this.onError(error)
		}
	}

	stop () {
		if (this.process) {
			this.process.kill()
		}

		this.process = null
		this.running = false
	}

}
