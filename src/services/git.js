import ChildProcess from '../ChildProcess'
import { spawnSync } from '../spawn'

let gitDirectory = null
let branchName = null

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

	const process = new ChildProcess(`cd ${gitDirectory} && git merge-base --is-ancestor ${branchNameA} ${branchNameB}; echo $?`, { onStdOut, onStdErr, onClose, onError }, true)
})

export const hasCommittedRemoteChanges = async () => !(await isBranchAncestorOfBranch(`origin/${branchName}`, branchName))

export const hasCommittedLocalChanges = async () => !(await isBranchAncestorOfBranch(branchName, `origin/${branchName}`))

export const hasUncommittedLocalChanges = () => new Promise((resolve, reject) => {
	try {
		const onStdOut = (data) => {
			const result = data.toString().replace(/\n*$/, '')

			if (result.trimLeft() === '0') {
				resolve(false)
			}
			else {
				resolve(true)
			}
		}

		const onStdErr = (data) => reject(data)
		const onClose = (code) => {}
		const onError = (error) => reject(error)

		const process = new ChildProcess(`cd ${gitDirectory} && git status --porcelain | wc -l`, { onStdOut, onStdErr, onClose, onError }, true)
	}
	catch (error) {
		throw Error('Failed to check git changes: ' + error)
	}
})

export const resetLocalChanges = () => new Promise((resolve, reject) => {
	try {
		const onStdOut = (data) => {}
		const onStdErr = (data) => reject(data)
		const onClose = (code) => resolve(true)
		const onError = (error) => reject(error)

		const process = new ChildProcess(`cd ${gitDirectory} && git reset --hard origin/${branchName}`, { onStdOut, onStdErr, onClose, onError }, true)
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

		const process = new ChildProcess(`cd ${gitDirectory} && git add . && git commit -m '${message}'`, { onStdOut, onStdErr, onClose, onError }, true)
	}
	catch (error) {
		throw Error('Failed to create git commit: ' + error)
	}
})

export const pushChanges = () => new Promise((resolve, reject) => {
	try {
		const onStdOut = (data) => {}
		const onStdErr = (data) => {}

		const onClose = (code) => {
			if (code === 0) {
				resolve(true)
			}
			else {
				reject(Error('Failed to push changes, exited with code ' + code))
			}
		}

		const onError = (error) => reject(error)

		const process = new ChildProcess(`cd ${gitDirectory} && git push origin ${branchName}`, { onStdOut, onStdErr, onClose, onError }, true)
	}
	catch (error) {
		throw Error('Failed to push git branch: ' + error)
	}
})

export const pullChanges = () => new Promise((resolve, reject) => {
	try {
		const onStdOut = (data) => {
			console.log('stdOut ', data.toString())
		}

		const onStdErr = (data) => {
			console.log('stdErr ', data.toString())
		}

		const onClose = (code) => {
			console.log('close ', code)

			if (code === 0) {
				resolve(true)
			}
			else {
				reject(Error('Failed to pull changes, exited with code ' + code))
			}
		}

		const onError = (error) => {
			console.log('error ', error)
			reject(error)
		}

		const process = new ChildProcess(`cd ${gitDirectory} && git pull origin ${branchName} --no-rebase --commit --no-edit`, { onStdOut, onStdErr, onClose, onError }, true)
	}
	catch (error) {
		console.log('caugth ', error)
		throw Error('Failed to pull git branch: ' + error)
	}
})

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

		const data = spawnSync(`cd ${directory} && git branch --show-current`)
		branchName = data.toString().replace(/\n*$/, '')
		gitDirectory = directory

		resolve(branchName)
	}
	catch (error) {
		throw Error('Failed to open git repo: ' + error)
	}
})

export const closeGitRepo = () => {
	gitDirectory = null
	branchName = null
}

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

// 	const process = new ChildProcess(`cd ${targetDirectory} && git clone ${remoteUrl} && yarn install --ignore-scripts`, { onClose, onError })

// }
