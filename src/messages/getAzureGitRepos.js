import { getAzureGitRepos as get, connectToAzure, readAzureCredentialsMetadata, writeAzureCredentialsMetadata } from '../services'

export const getAzureGitRepos = async (state, payload) => {
	try {
		const credentials = readAzureCredentialsMetadata()

		try {
			await connectToAzure(credentials.username, credentials.accessToken)
		}
		catch (loginError) {
			writeAzureCredentialsMetadata({ username: credentials.username, accessToken: '' })
			throw Error('Failed to authenticate with Azure: ' + loginError)
		}

		const gitRepos = await get()
		return gitRepos
	}
	catch (error) {
		throw Error('Failed getting Azure git repos: ' + error)
	}
}
