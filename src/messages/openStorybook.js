import { openStorybook as open, updateStorybookTempTheme } from '../services'

export const openStorybook = (webContents, showError, themeData) => {
	open(webContents, showError)
	updateStorybookTempTheme(themeData)
}
