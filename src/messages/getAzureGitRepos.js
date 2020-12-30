import { getAzureGitRepos as get } from '../services'

export const getAzureGitRepos = async (state, payload, webContents, showError) => {
	try {
		const { username, accessToken } = payload

		const gitRepos = get(username, accessToken, webContents, showError)
		webContents.executeJavaScript(`window.setGitRepos(${JSON.stringify(gitRepos)})`)
	}
	catch (error) {
		const message = 'Error getting Azure git repos: ' + error
		console.error(message)
		showError(message)
	}
}
