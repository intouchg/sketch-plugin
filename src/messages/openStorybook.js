import { openStorybook as open, updateStorybookTempTheme } from '../services'

export const openStorybook = (webContents, displayErrorInWebview, themeData) => {
	open(webContents, displayErrorInWebview)
	updateStorybookTempTheme(themeData)
}
