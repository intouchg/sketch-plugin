import { AzureUserConnection } from '@i/azure'
import { sortAlphabetical } from '@i/utility'

const AZURE_INSTANCE_URL = 'https://intazdoweb.intouchsol.com'

let azureConnection = null

export const connectToAzure = async (username, accessToken) => {
	azureConnection = new AzureUserConnection({
		instanceUrl: AZURE_INSTANCE_URL,
		username,
		accessToken,
		concurrency: 10,
	})

	await azureConnection.getOrganizations()
}

export const getAzureGitRepos = async () => {
	try {
		if (!azureConnection) {
			throw Error('Attempted to getAzureGitRepos before azureConnection was initialized.')
		}

		if (!azureConnection.lastGitRepoSync) {
			await azureConnection.getGitRepos()
		}

		const gitRepos = azureConnection.gitRepos.map((repoData) => ([
			repoData[0],
			repoData[1].sort((a, b) => sortAlphabetical(a, b, 'name')),
		]))

		const sortedGitRepos = gitRepos.sort((a, b) => sortAlphabetical(a[0], b[0]))
		return sortedGitRepos
	}
	catch (error) {
		throw Error('Failed to get Azure git repos: ' + error)
	}
}

