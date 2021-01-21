import { openDevServer as openServer } from '../services'
import { escapeStringForShell } from '../spawn'

export const openDevServer = async (state, payload) => {
	try {
		const { selectedProjectDirectory } = state
		const escapedDirectory = escapeStringForShell(selectedProjectDirectory)
		await openServer(escapedDirectory)
		return true
	}
	catch (error) {
		throw Error('Failed to open dev server: ' + error)
	}
}
