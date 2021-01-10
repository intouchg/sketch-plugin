import { readAzureCredentialsMetadata, writeAzureCredentialsMetadata, connectToAzure, getAzureGitRepos } from '../services'

export const getAzureCredentials = async (state, payload) => {
	let credentials

	try {
		credentials = readAzureCredentialsMetadata()

		if (!credentials.username || !credentials.accessToken) {
			return credentials
		}
	}
	catch (error) {
		throw Error('Failed to retrieve Azure credentials metadata: ' + error)
	}

	try {
		await connectToAzure(credentials.username, credentials.accessToken)
		getAzureGitRepos()
		return credentials
	}
	catch (loginError) {
		writeAzureCredentialsMetadata({ username: credentials.username, accessToken: '' })
		throw Error('Failed to authenticate with Azure: ' + loginError)
	}
}
