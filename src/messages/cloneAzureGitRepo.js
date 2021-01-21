import { cloneGitRepo, createNewRandomBranchName } from '../services'
import { getWebview } from 'sketch-module-web-view/remote'
import { WEBVIEW_IDENTIFIER } from '../index'

export const cloneAzureGitRepo = async (state, payload) => {
	try {
		const { filepath, remoteUrl, repoName, branchName } = payload
		const webview = getWebview(WEBVIEW_IDENTIFIER)

		if (!webview || !webview.webContents) {
			throw Error('Could not locate webview with identifier ' + WEBVIEW_IDENTIFIER)
		}

		const webContents = webview.webContents
		const progressCallback = (progress) => webContents.executeJavaScript(`window.updateCloneProgress(${progress})`)

		await cloneGitRepo(filepath, remoteUrl, branchName, progressCallback)
		return await createNewRandomBranchName(filepath + '/' + repoName)
	}
	catch (error) {
		throw Error('Failed to clone Azure git repo: ' + error)
	}
}
