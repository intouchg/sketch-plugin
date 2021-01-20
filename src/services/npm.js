import ChildProcess from '../ChildProcess'

export const npmInstall = (webContents, filepath) => new Promise((resolve, reject) => {
	try {
		const escapedDirectory = `"${filepath}"`

		const onStdOut = (data) => {
			const progressMatch = data.toString().match(/\[\d\/\d\]/g)

			if (progressMatch) {
				const progressRatio = progressMatch[0].match(/\d/g)
				const progress = (parseInt(progressRatio[0], 10) / parseInt(progressRatio[1], 10)) * 100
				webContents.executeJavaScript(`window.updateCloneProgress(${progress})`)
			}
		}

		const onStdErr = (data) => {}

		const onClose = (code) => {
			if (code === 0) {
				resolve(true)
			}
			else {
				throw Error('NPM install exited with code ' + code)
			}
		}

		const onError = (error) => {
			throw Error(error)
		}

		const process = new ChildProcess(`cd ${escapedDirectory} && yarn install`, { onStdOut, onStdErr, onClose, onError }, true)
	}
	catch (error) {
		throw Error('Failed to npm install: ' + error)
	}
})
