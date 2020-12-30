import { connectToAzure } from '../services'
import { writeAzureCredentialsMetadata } from '../services'

export const loginToAzure = async (state, payload, webContents, showError) => {
	try {
		const credentials = payload

		await connectToAzure(credentials.username, credentials.accessToken)
		writeAzureCredentialsMetadata(credentials)
		webContents.executeJavaScript(`window.setAzureCredentials(${JSON.stringify(credentials)})`)
		webContents.executeJavaScript(`window.handleAzureLoginResult(true)`)
	}
	catch (error) {
		console.error('Error attempting to login to Azure:', error)
		webContents.executeJavaScript(`window.handleAzureLoginResult(false)`)
	}
}
