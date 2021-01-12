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

		const sortedGitRepos = {}

		Object.keys(azureConnection.gitRepos).sort(sortAlphabetical).forEach((organizationName) => {
			sortedGitRepos[organizationName] = azureConnection.gitRepos[organizationName].sort((a, b) => sortAlphabetical(a, b, 'name'))
		})

		return sortedGitRepos
	}
	catch (error) {
		throw Error('Failed to get Azure git repos: ' + error)
	}
}

