import { hasCommittedRemoteChanges, hasUncommittedLocalChanges, commitChanges, pullChanges } from '../services'

export const checkForRemoteUpdates = async (state, payload) => {
	try {
		if (await hasCommittedRemoteChanges()) {
			if (await hasUncommittedLocalChanges()) {
				await commitChanges('IDS pre-pull automated save')
			}

			await pullChanges()
		}

		return true
	}
	catch (error) {
		throw Error('Failed to pull remote changes: ' + error)
	}
}
