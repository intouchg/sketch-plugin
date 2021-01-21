import ChildProcess from '../ChildProcess'
import { spawnSync, escapeStringForShell } from '../spawn'
import { randomPhrase } from '@i/random-phrase'

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
		throw Error('Failed to get timestamp by commit: ' + error)
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
		const { stdout } = spawnSync(`cd ${gitDirectory} && git reflog show origin/${branchName} --pretty='%h %gd %gs' --date=iso`)
		const lastPushEntry = stdout.toString().split('\n').find((str) => str.includes(lastPushHash) && str.includes('update by push'))
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
		const { stdout } = spawnSync(`cd ${gitDirectory} && git ls-remote origin -h refs/heads/${branchName}`)
		const output = stdout.toString()

		if (!output.includes(`\trefs/heads/${branchName}`)) {
			throw Error('Received unexpected result from ls-remote: ' + output)
		}

		const commitId = output.split('\t')[0]
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

export const resetMergeConflict = () => new Promise((resolve, reject) => {
	try {
		const { status, stderr } = spawnSync(`cd ${gitDirectory} && git reset --hard`)

		if (status === 0) {
			resolve(true)
		}
		else {
			throw Error(stderr)
		}
	}
	catch (error) {
		throw Error('Failed to reset merge conflict: ' + error)
	}
})

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
		const { status, stderr } = spawnSync(`cd ${gitDirectory} && git push origin ${branchName}`)

		if (status === 0) {
			resolve({ didSaveChanges: true, needsToUpdate: false })
		}
		else if (
			stderr.toString().includes('Updates were rejected because the remote contains work')
			|| stderr.toString().includes('Updates were rejected because the tip of your current branch is behind')
		) {
			resolve({ didSaveChanges: false, needsToUpdate: true })
		}
		else {
			throw Error(stderr)
		}
	}
	catch (error) {
		throw Error('Failed to push git branch: ' + error)
	}
})

export const pullChanges = () => new Promise((resolve, reject) => {
	try {
		const { status, stdout, stderr } = spawnSync(`cd ${gitDirectory} && git pull origin ${branchName} --no-rebase --commit --no-edit`)

		if (status === 0) {
			const output = stdout.toString()
			const didReceiveChanges = output.includes('Fast-forward') || output.includes('Merge')
			resolve({ didReceiveChanges, hasMergeConflict: false })
		}
		else if (stdout.toString().includes('Automatic merge failed; fix conflicts')) {
			resetMergeConflict()
				.then(() => {
					resolve({ didReceiveChanges: true, hasMergeConflict: true })
				})
				.catch((error) => {
					throw Error(error)
				})
		}
		else {
			throw Error(stderr)
		}
	}
	catch (error) {
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
		const escapedDirectory = escapeStringForShell(directory)

		const { stdout } = spawnSync(`cd ${escapedDirectory} && git branch --show-current`)
		branchName = stdout.toString().replace(/\n*$/, '')
		gitDirectory = escapedDirectory

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

export const cloneGitRepo = (filepath, remoteUrl, branchName, progressCallback) => new Promise((resolve, reject) => {
	try {
		const escapedDirectory = escapeStringForShell(filepath)

		const onStdOut = (data) => {}

		const onStdErr = (data) => {
			const progressMatch = data.toString().match(/Receiving objects:.*\d%/g)

			if (progressMatch && progressCallback) {
				const progress = progressMatch[progressMatch.length - 1].split('Receiving objects: ')[1]
				progressCallback(parseInt(progress, 10))
			}
		}

		const onClose = (code) => {
			if (code === 0) {
				resolve(true)
			}
			else {
				throw Error('Git clone exited with code ' + code)
			}
		}

		const onError = (error) => {
			throw Error(error)
		}

		const process = new ChildProcess(`cd ${escapedDirectory} && git clone ${remoteUrl} --progress${branchName ? ` --branch ${branchName}` : ''}`, { onStdOut, onStdErr, onClose, onError }, true)
	}
	catch (error) {
		throw Error('Failed to clone git repo: ' + error)
	}
})

export const createNewRandomBranchName = (filepath) => new Promise((resolve, reject) => {
	try {
		const escapedDirectory = escapeStringForShell(filepath)
		const newBranchName = randomPhrase({ template: 'ids/[adjective]-[word]-[noun]' })
		const { status, stderr } = spawnSync(`cd ${escapedDirectory} && git checkout -b ${newBranchName} && git push origin ${newBranchName} -u`)

		if (status === 0) {
			resolve(true)
		}
		else {
			throw Error(stderr)
		}
	}
	catch (error) {
		throw Error('Failed to create new random branch name: ' + error)
	}
})
