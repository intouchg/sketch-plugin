import { hasUncommittedLocalChanges, commitChanges, pullChanges } from '../services'

export const downloadRemoteChanges = async (state, payload) => {
	try {
		if (await hasUncommittedLocalChanges()) {
			await commitChanges('IDS pre-pull automated save')
		}

		const didReceiveUpdates = await pullChanges()
		return didReceiveUpdates
	}
	catch (error) {
		throw Error('Failed to download remote updates: ' + error)
	}
}