import fs from '@skpm/fs'
import { updateStorybookTempTheme } from '../services'

export const saveThemeData = async (webContents, displayErrorInWebview, newThemeData, themeFilepaths) => {
	try {
		await Promise.all(Object.entries(newThemeData).map(async ([ key, value ]) => {
			fs.writeFileSync(themeFilepaths[key], JSON.stringify(value, null, '\t'))
		}))

		updateStorybookTempTheme(newThemeData)

		webContents.executeJavaScript('window.saveResult(true)')
		webContents.executeJavaScript('window.setSaveThemeDataResult(true)')
	}
	catch (error) {
		console.error('Error attempting to write plugin theme changes to the project\'s working directory: ', error)
		webContents.executeJavaScript('window.setSaveThemeDataResult(false)')
	}
}
