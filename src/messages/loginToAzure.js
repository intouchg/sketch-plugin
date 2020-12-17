import { connectToAzure } from '../services'
import { writeAzureCredentialsMetadata } from '../services'

export const loginToAzure = async (webContents, showError, credentialsData) => {
	try {
		await connectToAzure(credentialsData.username, credentialsData.accessToken)
		writeAzureCredentialsMetadata(credentialsData)
		webContents.executeJavaScript(`window.setAzureCredentials(${JSON.stringify(credentialsData)})`)
		webContents.executeJavaScript(`window.handleAzureLoginResult(true)`)
	}
	catch (error) {
		console.error('Error attempting to login to Azure:', error)
		webContents.executeJavaScript(`window.handleAzureLoginResult(false)`)
	}
}
