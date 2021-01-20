import { npmInstall } from '../services'
import { getWebview } from 'sketch-module-web-view/remote'
import { WEBVIEW_IDENTIFIER } from '../index'

export const installDependencies = async (state, payload) => {
	try {
		const { filepath } = payload
		const webview = getWebview(WEBVIEW_IDENTIFIER)

		if (!webview || !webview.webContents) {
			throw Error('Could not locate webview with identifier ' + WEBVIEW_IDENTIFIER)
		}

		return await npmInstall(webview.webContents, filepath)
	}
	catch (error) {
		throw Error('Failed to install project dependencies: ' + error)
	}
}
