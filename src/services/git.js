import ChildProcess from '../ChildProcess'

let gitProcess = null

export const stopGitProcess = () => gitProcess && gitProcess.stop()

export const cloneAzureGitRepo = async (remoteUrl, targetDirectory, webContents, displayErrorInWebview) => {
	const onClose = (code) => {
		webContents.executeJavaScript('window.clonedAzureGitRepo()')
		webContents.executeJavaScript(`window.displaySuccess('Downloaded Azure project.')`)
	}

	const onError = (error) => displayErrorInWebview(`Could not clone git repo: ${error}`)

	webContents.executeJavaScript('window.cloningAzureGitRepo()')

	gitProcess = new ChildProcess(`cd ${targetDirectory} && git clone ${remoteUrl}`, { onClose, onError })
}
