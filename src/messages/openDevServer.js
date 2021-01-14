import { openDevServer as openServer } from '../services'

export const openDevServer = (state, payload) => {
	try {
		const { selectedProjectDirectory } = state
		const escapedDirectory = `"${selectedProjectDirectory}"`
		openServer(escapedDirectory)
		return true
	}
	catch (error) {
		throw Error('Failed to open dev server: ' + error)
	}
}
