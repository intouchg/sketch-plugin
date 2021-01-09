import { hasUncommittedLocalChanges, commitChanges, pullChanges } from '../services'

export const downloadRemoteUpdates = async (state, payload) => {
	try {
		if (await hasUncommittedLocalChanges()) {
			await commitChanges('IDS pre-pull automated save')
		}

		await pullChanges()

		return true
	}
	catch (error) {
		throw Error('Failed to download remote updates: ' + error)
	}
}
