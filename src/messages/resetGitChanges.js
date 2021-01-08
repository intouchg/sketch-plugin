import { resetChanges } from '../services'

export const resetGitChanges = async (state, payload) => {
	try {
		await resetChanges()
		return state.themeData
	}
	catch (error) {
		throw Error('Failed to close local project: ' + error)
	}
}
