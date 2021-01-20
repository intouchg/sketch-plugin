import { cloneGitRepo } from '../services'
import { getWebview } from 'sketch-module-web-view/remote'
import { WEBVIEW_IDENTIFIER } from '../index'

export const cloneAzureGitRepo = async (state, payload) => {
	try {
		const { filepath, remoteUrl, branchName } = payload
		const webview = getWebview(WEBVIEW_IDENTIFIER)

		if (!webview || !webview.webContents) {
			throw Error('Could not locate webview with identifier ' + WEBVIEW_IDENTIFIER)
		}

		return await cloneGitRepo(webview.webContents, filepath, remoteUrl, branchName)
	}
	catch (error) {
		throw Error('Failed to clone Azure git repo: ' + error)
	}
}
