import fs from '@skpm/fs'
import { commitChanges, pullChanges, getLocalLastPushedCommitId, resetMergeConflict, rewriteLocalLastPushedCommitId } from '../services'

export const downloadRemoteChanges = async (state, payload) => {
	try {
		await commitChanges('IDS pre-pull automated commit')

		const oldTrackingBranchCommitId = await getLocalLastPushedCommitId()
		const pullResults = await pullChanges()

		if (pullResults.hasMergeConflict) {
			await resetMergeConflict()
			await rewriteLocalLastPushedCommitId(oldTrackingBranchCommitId)
		}

		Object.keys(state.themeFilepaths).forEach((key) => {
			const fileData = fs.readFileSync(state.themeFilepaths[key])
			state.themeData[key] = JSON.parse(fileData)
		})

		return {
			themeData: state.themeData,
			...pullResults,
		}
	}
	catch (error) {
		throw Error('Failed to download remote updates: ' + error)
	}
}
