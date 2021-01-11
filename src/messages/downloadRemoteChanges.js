import { commitChanges, pullChanges } from '../services'

export const downloadRemoteChanges = async (state, payload) => {
	try {
		await commitChanges('IDS pre-pull automated commit')

		Object.keys(state.themeFilepaths).forEach((key) => {
			const fileData = fs.readFileSync(state.themeFilepaths[key])
			state.themeData[key] = JSON.parse(fileData)
		})

		const didReceiveChanges = await pullChanges()

		return {
			themeData: state.themeData,
			didReceiveChanges,
		}
	}
	catch (error) {
		throw Error('Failed to download remote updates: ' + error)
	}
}
