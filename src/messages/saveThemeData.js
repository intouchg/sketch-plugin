import fs from '@skpm/fs'
// import { updateStorybookTempTheme } from '../services'
import { hasLocalChanges } from '../services'

export const saveThemeData = async (state, payload, webContents, showError) => {
	try {
		const newThemeData = payload
		const { themeFilepaths } = state

		await Promise.all(Object.entries(newThemeData).map(async ([ key, value ]) => {
			fs.writeFileSync(themeFilepaths[key], JSON.stringify(value, null, 2))
		}))

		const hasChanges = await hasLocalChanges()

		// updateStorybookTempTheme(newThemeData)

		return hasChanges
	}
	catch (error) {
		throw Error('Failed to save plugin theme changes to the project directory: ' + error)
	}
}
