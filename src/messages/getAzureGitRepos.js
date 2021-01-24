import { getAzureGitRepos as get, connectToAzure, readAzureCredentialsMetadata } from '../services'

export const getAzureGitRepos = async (state, payload) => {
	try {
		const credentials = readAzureCredentialsMetadata()
		await connectToAzure(credentials.username, credentials.accessToken)
		const gitRepos = await get()
		return gitRepos
	}
	catch (error) {
		throw Error('Failed getting Azure git repos: ' + error)
	}
}
