import { commitChanges, pullChanges, pushChanges } from '../services'

export const saveChangesToAzure = async (state, payload) => {
	try {
		await commitChanges('IDS pre-push automated save')
		await pushChanges()
		return true
	}
	catch (error) {
		throw Error('Failed to save changes to Azure: ' + error)
	}
}
