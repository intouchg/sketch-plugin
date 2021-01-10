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
		if (!azureConnection.lastGitRepoSync) {
			await azureConnection.getGitRepos()
		}

		const gitRepos = azureConnection.gitRepos.map(([ orgName, repos ]) => ([
			orgName,
			repos.sort((a, b) => sortAlphabetical(a, b, 'name')),
		]))

		const sortedGitRepos = gitRepos.sort(([ nameA ], [ nameB ]) => sortAlphabetical(nameA, nameB))

		return sortedGitRepos
	}
	catch (error) {
		throw Error('Failed to get Azure git repos: ' + error)
	}
}

