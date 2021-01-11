import { commitChanges, pushChanges, getTimestampByCommitId, getLocalLastPushedCommitId } from '../services'

export const saveChangesToAzure = async (state, payload) => {
	try {
		await commitChanges('IDS pre-push automated commit')
		await pushChanges()
		const lastPushTime = await getTimestampByCommitId(await getLocalLastPushedCommitId())
		return lastPushTime
	}
	catch (error) {
		throw Error('Failed to save changes to Azure: ' + error)
	}
}
