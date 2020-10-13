import { readRecentProjectMetadata } from '../services'

export const getRecentProjects = (webContents, showError) => {
	try {
		const recentProjects = readRecentProjectMetadata()
		webContents.executeJavaScript(`window.setRecentProjects(${JSON.stringify(recentProjects)})`)
	}
	catch (error) {
		showError('Error retrieving recent projects: ' + error)
	}
}