import { hasRemoteChanges } from '../services'

export const checkHasRemoteChanges = async (state, payload) => {
	try {
		return await hasRemoteChanges()
	}
	catch (error) {
		throw Error('Failed to check for remote updates: ' + error)
	}
}
