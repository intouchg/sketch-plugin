import { writeAzureCredentialsMetadata } from '../services'

export const saveAzureCredentials = async (webContents, showError, credentialsData) => {
	try {
		writeAzureCredentialsMetadata(credentialsData)
	}
	catch (error) {
		console.error('Error attempting to write Azure credentials metadata:', error)
	}
}
