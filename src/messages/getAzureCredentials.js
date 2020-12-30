import { readAzureCredentialsMetadata, writeAzureCredentialsMetadata, connectToAzure } from '../services'

export const getAzureCredentials = async (state, payload, webContents, showError) => {
	try {
		const credentials = readAzureCredentialsMetadata()

		if (!credentials.username || !credentials.accessToken) {
			return
		}

		try {
			await connectToAzure(credentials.username, credentials.accessToken)
			webContents.executeJavaScript(`window.setAzureCredentials(${JSON.stringify(credentials)})`)
		}
		catch (loginError) {
			writeAzureCredentialsMetadata({ username: credentials.username, accessToken: '' })
			console.error('Failed to authenticate with Azure: ', loginError)
		}
	}
	catch (error) {
		const message = 'Error retrieving Azure credentials metadata: ' + error
		console.error(message)
		showError(message)
	}
}
