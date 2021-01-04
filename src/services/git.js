import ChildProcess from '../ChildProcess'

let gitProcess = null
let gitDirectory = null
let branchName = null

export const stopGitProcess = () => {
	gitDirectory = null
	branchName = null

	if (gitProcess) {
		gitProcess.stop()
	}
}

export const openGitRepo = (directory) => new Promise((resolve, reject) => {
	stopGitProcess()

	const num = 0

	const onStdOut = (data) => (branchName = data.toString())

	const onStdErr = (data) => reject(data)

	const onClose = (code) => {
		gitDirectory = directory
		resolve(branchName)
	}

	const onError = (error) => reject(error)

	// webContents.executeJavaScript('window.cloningAzureGitRepo()')

	gitProcess = new ChildProcess(`cd ${directory} && git branch --show-current`, { onStdOut, onStdErr, onClose, onError }, true)
})

// export const cloneGitRepo = () => {
// 	stopGitProcess()

// 	const onStdOut = (data) => {
// 		console.log('clone std out')
// 		console.log(data)
// 	}

// 	const onStdErr = (data) => {
// 		console.log('clone std err')
// 		console.log(data)
// 	}

// 	const onClose = (code) => {
// 		resolve('Clone Success!')
// 	}

// 	const onError = (error) => showError(`Could not clone git repo: ${error}`)

// 	// webContents.executeJavaScript('window.cloningAzureGitRepo()')

// 	gitProcess = new ChildProcess(`cd ${targetDirectory} && git clone ${remoteUrl} && yarn install --ignore-scripts`, { onClose, onError })

// }
