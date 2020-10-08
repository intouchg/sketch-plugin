import { AzureUserConnection } from '@i/azure'

const AZURE_INSTANCE_URL = 'https://intazdoweb.intouchsol.com'

let azureConnection = null

export const getAzureGitRepos = async (webContents, displayErrorInWebview, { username, accessToken }) => {
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
			repos.sort(({ name: nameA }, { name: nameB }) => {
				const a = nameA.toLowerCase()
				const b = nameB.toLowerCase()
				return a > b ? 1 : (a < b ? -1 : 0)
			}),
		]))

		const sortedGitRepos = gitRepos.sort(([ nameA ], [ nameB ]) => {
			const a = nameA.toLowerCase()
			const b = nameB.toLowerCase()
			return a > b ? 1 : (a < b ? -1 : 0)
		})

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
