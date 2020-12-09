import { getAzureGitRepos as get } from '../services'

export const getAzureGitRepos = async (webContents, showError, { username, accessToken }) => {
	const gitRepos = get(username, accessToken, webContents, showError)
	webContents.executeJavaScript(`window.setGitRepos(${JSON.stringify(gitRepos)})`)
}
