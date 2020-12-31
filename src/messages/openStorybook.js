import { openStorybook as open, updateStorybookTempTheme } from '../services'

export const openStorybook = (state, payload, webContents, showError) => {
	const { themeData } = state

	open(webContents, showError)
	updateStorybookTempTheme(themeData)
}
