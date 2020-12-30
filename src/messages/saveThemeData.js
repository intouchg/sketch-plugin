import fs from '@skpm/fs'
import { updateStorybookTempTheme } from '../services'

export const saveThemeData = async (state, payload, webContents, showError) => {
	try {
		const newThemeData = payload
		const { themeFilepaths } = state

		await Promise.all(Object.entries(newThemeData).map(async ([ key, value ]) => {
			fs.writeFileSync(themeFilepaths[key], JSON.stringify(value, null, '\t'))
		}))

		updateStorybookTempTheme(newThemeData)
	}
	catch (error) {
		const message = 'Error attempting to write plugin theme changes to the project\'s working directory: ' + error
		console.error(message)
		showError(message)
	}
}
