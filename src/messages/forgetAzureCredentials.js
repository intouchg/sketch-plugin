import { writeAzureCredentialsMetadata } from '../services'

export const forgetAzureCredentials = async (state, payload, webContents, showError) => {
	try {
		writeAzureCredentialsMetadata({ username: '', accessToken: '' })
	}
	catch (error) {
		const message = 'Error forgetting Azure credentials metadata: ' + error
		console.error(message)
		showError(message)
	}
}
