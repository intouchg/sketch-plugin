import { spawn } from '@skpm/child_process'

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

				throw new Error('Error spawning new ChildProcess: ' + error)
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
				this.process = false

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
