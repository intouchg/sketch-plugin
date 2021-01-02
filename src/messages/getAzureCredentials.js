import { readAzureCredentialsMetadata, writeAzureCredentialsMetadata, connectToAzure } from '../services'

export const getAzureCredentials = async (state, payload) => {
	try {
		const credentials = readAzureCredentialsMetadata()

		if (!credentials.username || !credentials.accessToken) {
			return credentials
		}

		try {
			await connectToAzure(credentials.username, credentials.accessToken)
			return credentials
		}
		catch (loginError) {
			writeAzureCredentialsMetadata({ username: credentials.username, accessToken: '' })
			throw Error('Failed to authenticate with Azure: ', loginError)
		}
	}
	catch (error) {
		throw Error('Failed to retrieve Azure credentials metadata: ' + error)
	}
}
