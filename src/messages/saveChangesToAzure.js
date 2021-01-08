import { hasCommittedRemoteChanges, hasUncommittedLocalChanges, commitChanges, pullChanges, pushChanges } from '../services'

export const saveChangesToAzure = async (state, payload) => {
	try {
		if (await hasUncommittedLocalChanges()) {
            await commitChanges('IDS pre-push automated save')
        }

        if (await hasCommittedRemoteChanges()) {
            await pullChanges()
        }

        await pushChanges()

        return true
	}
	catch (error) {
		throw Error('Failed to save changes to Azure: ' + error)
	}
}
