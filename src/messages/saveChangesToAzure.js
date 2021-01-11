import { commitChanges, pushChanges, getTimestampOfLastPush } from '../services'

export const saveChangesToAzure = async (state, payload) => {
	try {
		await commitChanges('IDS pre-push automated commit')
		await pushChanges()
		const lastPushTime = await getTimestampOfLastPush()
		return lastPushTime
	}
	catch (error) {
		throw Error('Failed to save changes to Azure: ' + error)
	}
}
