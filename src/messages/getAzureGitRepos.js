import { AzureUserConnection } from '@i/azure'
import { sortAlphabetical } from '@i/utility'

const AZURE_INSTANCE_URL = 'https://intazdoweb.intouchsol.com'

let azureConnection = null

export const getAzureGitRepos = async (webContents, showError, { username, accessToken }) => {
	try {
		if (!azureConnection) {
			azureConnection = new AzureUserConnection({
				instanceUrl: AZURE_INSTANCE_URL,
				username,
				accessToken,
				concurrency: 10,
			})
		}

		if (!azureConnection.lastGitRepoSync) {
			await azureConnection.getGitRepos()
		}

		const gitRepos = azureConnection.gitRepos.map(([ orgName, repos ]) => ([
			orgName,
			repos.sort((a, b) => sortAlphabetical(a, b, 'name')),
		]))

		const sortedGitRepos = gitRepos.sort(([ nameA ], [ nameB ]) => sortAlphabetical(nameA, nameB))

		webContents.executeJavaScript(`window.setGitRepos(${JSON.stringify(sortedGitRepos)})`)
	}
	catch (error) {
		console.error(error)
		/* eslint-disable */
        azureConnection = null
        /* eslint-enable */
		webContents.executeJavaScript(`window.azureRequestError(${JSON.stringify(error)})`)
	}
}
