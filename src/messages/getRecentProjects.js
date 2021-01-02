import { readRecentProjectMetadata } from '../services'

export const getRecentProjects = (webContents, showError) => {
	try {
		const recentProjects = readRecentProjectMetadata()
		return recentProjects
	}
	catch (error) {
		throw Error('Failed to retrieve recent projects: ' + error)
	}
}
