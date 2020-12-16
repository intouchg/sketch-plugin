import { readAzureCredentialsMetadata } from '../services'

export const getRecentProjects = (webContents, showError) => {
	try {
		const credentials = readAzureCredentialsMetadata()
		webContents.executeJavaScript(`window.setAzureCredentials(${JSON.stringify(credentials)})`)
	}
	catch (error) {
		showError('Error retrieving Azure credentials: ' + error)
	}
}
