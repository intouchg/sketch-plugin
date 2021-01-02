import { readRecentProjectMetadata } from '../services'

export const getRecentProjects = (state, payload) => {
	try {
		const recentProjects = readRecentProjectMetadata()
		return recentProjects
	}
	catch (error) {
		throw Error('Failed to retrieve recent projects: ' + error)
	}
}
