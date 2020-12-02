import ChildProcess from '../ChildProcess'

const FETCHING_PACKAGES_REGEX = /Fetching packages\.\.\.\n\[-*\]\W\d*\/\d*$/g
const LINKING_PACKAGES_REGEX = /Linking packages\.\.\.\n\[-*\]\W\d*\/\d*$/g
const PACKAGE_COMPLETION_RATIO_REGEX = /(\d*\/\d*)$/g

let gitProcess = null

export const stopGitProcess = () => gitProcess && gitProcess.stop()

export const cloneAzureGitRepo = async (remoteUrl, targetDirectory, webContents, showError) => {
	// TO DO: finish this - parse the "yarn install" progress to display a progress bar

	const onStdOut = (data) => {
		console.log('std out')
		console.log(data)
	}

	const onStdErr = (data) => {
		console.log('std err')
		console.log(data)
	}

	const onClose = (code) => {
		webContents.executeJavaScript('window.clonedAzureGitRepo()')
		webContents.executeJavaScript(`window.displaySuccess('Downloaded Azure project.')`)
	}

	const onError = (error) => showError(`Could not clone git repo: ${error}`)

	webContents.executeJavaScript('window.cloningAzureGitRepo()')

	gitProcess = new ChildProcess(`cd ${targetDirectory} && git clone ${remoteUrl} && yarn install --ignore-scripts`, { onClose, onError })
}
