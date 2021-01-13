import { openDevServer as openServer } from '../services'

export const openDevServer = (state, payload) => {
	try {
		const { selectedProjectDirectory } = state
		const directory = selectedProjectDirectory.replace(/ /g, '\\ ')
		openServer(directory)
		return true
	}
	catch (error) {
		throw Error('Failed to open dev server: ' + error)
	}
}
