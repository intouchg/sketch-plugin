import fs from '@skpm/fs'
import { updateStorybookTempTheme } from '../services'

export const saveThemeData = async (webContents, showError, newThemeData, themeFilepaths) => {
	try {
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
