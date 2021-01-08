import { resetLocalChanges as reset } from '../services'

export const resetLocalChanges = async (state, payload) => {
	try {
		await reset()
		return state.themeData
	}
	catch (error) {
		throw Error('Failed to close local project: ' + error)
	}
}
