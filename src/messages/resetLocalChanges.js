import fs from '@skpm/fs'
import { resetLocalChanges as reset } from '../services'

export const resetLocalChanges = async (state, payload) => {
	try {
		await reset()

		Object.entries(state.themeFilepaths).forEach(([ key, filepath ]) => {
			const fileData = fs.readFileSync(filepath)
			state.themeData[key] = JSON.parse(fileData)
		})

		return state.themeData
	}
	catch (error) {
		throw Error('Failed to reset local changes: ' + error)
	}
}
