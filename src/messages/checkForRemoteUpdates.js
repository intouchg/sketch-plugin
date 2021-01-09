import { hasCommittedRemoteChanges, hasUncommittedLocalChanges, commitChanges, pullChanges } from '../services'

export const checkForRemoteUpdates = async (state, payload) => {
	try {
		if (await hasCommittedRemoteChanges()) {
			return true
		}

		return false
	}
	catch (error) {
		throw Error('Failed to check for remote updates: ' + error)
	}
}
