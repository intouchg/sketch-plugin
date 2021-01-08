import ChildProcess from '../ChildProcess'

let gitProcess = null
let gitDirectory = null
let branchName = null

export const stopGitProcess = () => gitProcess && gitProcess.stop()

export const resetChanges = () => new Promise((resolve, reject) => {
	try {
		const onStdOut = (data) => {}
		const onStdErr = (data) => reject(data)
		const onClose = (code) => resolve(true)
		const onError = (error) => reject(error)

		gitProcess = new ChildProcess(`cd ${gitDirectory} && git reset --hard`, { onStdOut, onStdErr, onClose, onError }, true)
	}
	catch (error) {
		throw Error('Failed to reset git changes: ' + error)
	}
})

export const commitChanges = (message) => new Promise((resolve, reject) => {
	try {
		const onStdOut = (data) => {}
		const onStdErr = (data) => reject(data)
		const onClose = (code) => resolve(true)
		const onError = (error) => reject(error)

		gitProcess = new ChildProcess(`cd ${gitDirectory} && git add . && git commit -m '${message}'`, { onStdOut, onStdErr, onClose, onError }, true)
	}
	catch (error) {
		throw Error('Failed to create git commit: ' + error)
	}
})

// Checks if branchNameA is an ancestor of branchNameB.
// If true, branchNameB is caught up with branchNameA.
export const isBranchAncestorOfBranch = (branchNameA, branchNameB) => new Promise((resolve, reject) => {
	const onStdOut = (data) => {
		const result = data.toString().replace(/\n*$/, '')

		if (result === '0' || result === '1') {
			resolve(result === '0')
		}

		reject(result)
	}

	const onStdErr = (data) => reject(data)
	const onClose = (code) => {}
	const onError = (error) => reject(error)

	gitProcess = new ChildProcess(`cd ${gitDirectory} && git merge-base --is-ancestor ${branchNameA} ${branchNameB}; echo $?`, { onStdOut, onStdErr, onClose, onError }, true)
})

export const pullChanges = async () => {
	try {
		// await commitChanges('')
		const hasLocalChanges = !(await isBranchAncestorOfBranch(branchName, `origin/${branchName}`))
		const hasRemoteChanges = !(await isBranchAncestorOfBranch(`origin/${branchName}`, branchName))
		console.log('hasLocalChanges = ', hasLocalChanges)
		console.log('hasRemoteChanges = ', hasRemoteChanges)
		// const onStdOut = (data) => {}
		// const onStdErr = (data) => reject(data)
		// const onClose = (code) => resolve(true)
		// const onError = (error) => reject(error)

		// new ChildProcess(`cd ${gitDirectory} && git add . && git commit -m '${message}'`, { onStdOut, onStdErr, onClose, onError }, true)
	}
	catch (error) {
		throw Error('Failed to pull git changes: ' + error)
	}
}

export const getLastPushTime = async () => new Promise((resolve, reject) => {
	try {
		// Do stuff
	}
	catch (error) {
		throw Error('Failed to get last push time for git branch: ' + error)
	}
})

export const openGitRepo = (directory) => new Promise((resolve, reject) => {
	try {
		gitDirectory = null
		branchName = null

		const onStdOut = (data) => (branchName = data.toString().replace(/\n*$/, ''))
		const onStdErr = (data) => reject(data)

		const onClose = (code) => {
			gitDirectory = directory
			resolve(branchName)
		}

		const onError = (error) => reject(error)

		// webContents.executeJavaScript('window.cloningAzureGitRepo()')

		gitProcess = new ChildProcess(`cd ${directory} && git branch --show-current`, { onStdOut, onStdErr, onClose, onError }, true)
	}
	catch (error) {
		throw Error('Failed to open git repo: ' + error)
	}
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
