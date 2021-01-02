import { writeAzureCredentialsMetadata } from '../services'

export const forgetAzureCredentials = async (state, payload) => {
	try {
		writeAzureCredentialsMetadata({ username: '', accessToken: '' })
		return true
	}
	catch (error) {
		throw Error('Error forgetting Azure credentials metadata: ' + error)
	}
}
