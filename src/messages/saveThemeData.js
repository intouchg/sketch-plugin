import fs from '@skpm/fs'
// import { updateStorybookTempTheme } from '../services'

export const saveThemeData = async (state, payload, webContents, showError) => {
	try {
		const newThemeData = payload
		const { themeFilepaths } = state

		await Promise.all(Object.entries(newThemeData).map(async ([ key, value ]) => {
			fs.writeFileSync(themeFilepaths[key], JSON.stringify(value, null, '\t'))
		}))

		// updateStorybookTempTheme(newThemeData)
		return true
	}
	catch (error) {
		throw Error('Failed to save plugin theme changes to the project directory: ' + error)
	}
}
