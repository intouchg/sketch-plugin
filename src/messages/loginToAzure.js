import { connectToAzure } from '../services'
import { writeAzureCredentialsMetadata } from '../services'

export const loginToAzure = async (state, payload) => {
	try {
		const credentials = payload

		await connectToAzure(credentials.username, credentials.accessToken)
		writeAzureCredentialsMetadata(credentials)
		return credentials
	}
	catch (error) {
		if (error.hasOwnProperty('status') && error.status === 401) {
			throw Error('Failed to login to Azure: 401 Authentication Failed')
		}

		throw Error('Failed to login to Azure: ' + error)
	}
}
