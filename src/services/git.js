import ChildProcess from '../ChildProcess'
import { spawnSync } from '../spawn'

let gitDirectory = null
let branchName = null

export const getTimestampOfCommit = (commitId) => new Promise((resolve, reject) => {
	try {
		const onStdOut = (data) => resolve(data.toString().replace(/\n*$/, ''))
		const onStdErr = (data) => reject(data)
		const onClose = (code) => {}
		const onError = (error) => reject(error)

		// https://git-scm.com/docs/git-show
		const process = new ChildProcess(`cd ${gitDirectory} && git show --no-patch --no-notes --pretty='%cd' ${commitId}`, { onStdOut, onStdErr, onClose, onError }, true)
	}
	catch (error) {
		throw Error('Failed to get timestamp by commit id: ' + error)
	}
})

export const getLocalLastPushedCommitId = () => new Promise((resolve, reject) => {
	try {
		const onStdOut = (data) => resolve(data.toString().replace(/\n*$/, ''))
		const onStdErr = (data) => reject(data)
		const onClose = (code) => {}
		const onError = (error) => reject(error)

		// https://git-scm.com/docs/git-rev-parse
		const process = new ChildProcess(`cd ${gitDirectory} && git rev-parse origin/${branchName}`, { onStdOut, onStdErr, onClose, onError }, true)
	}
	catch (error) {
		throw Error('Failed to get local last pushed commit id: ' + error)
	}
})

export const getTimestampOfLastPush = async () => {
	try {
		const lastPushCommitId = await getLocalLastPushedCommitId()
		const lastPushHash = lastPushCommitId.substr(0, 7)
		const process = spawnSync(`cd ${gitDirectory} && git reflog show origin/${branchName} --pretty='%h %gd %gs' --date=iso`)
		const reflog = process.stdout.toString()
		const lastPushEntry = reflog.split('\n').find((str) => str.includes(lastPushHash) && str.includes('update by push'))
		let timestamp = null

		if (lastPushEntry) {
			const match = lastPushEntry.match(/@\{([\d-: ]*)\}/)

			if (match && match[1]) {
				const isoTimestamp = match[1]
				timestamp = isoTimestamp.substr(0, 4) + '/' + isoTimestamp.substr(5, 2) + '/' + isoTimestamp.substr(8)
			}
		}

		return timestamp
	}
	catch (error) {
		throw Error('Failed to get timestamp of last push: ' + error)
	}
}

export const getLocalCurrentCommitId = () => new Promise((resolve, reject) => {
	try {
		const onStdOut = (data) => resolve(data.toString().replace(/\n*$/, ''))
		const onStdErr = (data) => reject(data)
		const onClose = (code) => {}
		const onError = (error) => reject(error)

		// https://git-scm.com/docs/git-rev-parse
		const process = new ChildProcess(`cd ${gitDirectory} && git rev-parse ${branchName}`, { onStdOut, onStdErr, onClose, onError }, true)
	}
	catch (error) {
		throw Error('Failed to get local current commit id: ' + error)
	}
})

export const getRemoteCurrentCommitId = () => new Promise((resolve, reject) => {
	try {
		const process = spawnSync(`cd ${gitDirectory} && git ls-remote origin -h refs/heads/${branchName}`)
		const result = process.stdout.toString().replace(/\n*$/, '')

		if (!result.includes(`\trefs/heads/${branchName}`)) {
			throw Error('Received unexpected result from ls-remote: ' + result)
		}

		const commitId = result.split('\t')[0]
		resolve(commitId)
	}
	catch (error) {
		throw Error('Failed to get remote current commit id: ' + error)
	}
})

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

		// https://git-scm.com/docs/git-status
		const process = new ChildProcess(`cd ${gitDirectory} && git status --porcelain | wc -l`, { onStdOut, onStdErr, onClose, onError }, true)
	}
	catch (error) {
		throw Error('Failed to check git changes: ' + error)
	}
})

export const hasLocalChanges = async () => {
	const values = await Promise.all([
		hasUncommittedLocalChanges(),
		getLocalCurrentCommitId(),
		getLocalLastPushedCommitId(),
	])

	return values[0] || values[1] !== values[2]
}

export const hasRemoteChanges = async () => {
	const ids = await Promise.all([
		getRemoteCurrentCommitId(),
		getLocalLastPushedCommitId(),
	])

	return ids[0] !== ids[1]
}

export const resetLocalChanges = () => new Promise((resolve, reject) => {
	try {
		const onStdOut = (data) => {}
		const onStdErr = (data) => reject(data)
		const onClose = (code) => resolve(true)
		const onError = (error) => reject(error)

		// https://git-scm.com/docs/git-reset
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
		const process = spawnSync(`cd ${gitDirectory} && git push origin ${branchName}`)
		console.log(process)

		if (process.status === 0) {
			resolve(true)
		}
		else {
			console.log(process.stderr)
			resolve(false)
		}
	}
	catch (error) {
		throw Error('Failed to push git branch: ' + error)
	}
})

export const pullChanges = () => new Promise((resolve, reject) => {
	try {
		const process = spawnSync(`cd ${gitDirectory} && git pull origin ${branchName} --no-rebase --commit --no-edit`)
		console.log(process)

		if (process.status === 0) {
			const result = process.stdout.toString()
			console.log('didReceiveChanges? ', process)
			const didReceiveChanges = result.includes('Fast-forward') || result.includes('Merge')
			resolve(didReceiveChanges)
		}
		else {
			console.log(process.stderr)
			resolve(false)
		}
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

		const process = spawnSync(`cd ${directory} && git branch --show-current`)
		branchName = process.stdout.toString().replace(/\n*$/, '')
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
