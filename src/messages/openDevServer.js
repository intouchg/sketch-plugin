import { openDevServer as openServer } from '../services'
import { escapeStringForShell } from '../spawn'

export const openDevServer = (state, payload) => {
	try {
		const { selectedProjectDirectory } = state
		const escapedDirectory = escapeStringForShell(selectedProjectDirectory)
		openServer(escapedDirectory)
		return true
	}
	catch (error) {
		throw Error('Failed to open dev server: ' + error)
	}
}
