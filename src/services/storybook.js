import fs from '@skpm/fs'
import path from '@skpm/path'
import { themeProcessor } from '@intouchg/theme'
import ChildProcess from '../ChildProcess'

const PARSE_STORYBOOK_WEBPACK_PROGRESS_REGEX = /\[webpack\.Progress\] (\d*)%/
const STORYBOOK_TEMP_THEME_FILENAME = '.storybook/temp-theme.json'
const STORYBOOK_TEMP_THEME_FILEPATH = path.resolve(process.cwd(), '../' + STORYBOOK_TEMP_THEME_FILENAME)
const STORYBOOK_URL = 'http://localhost:64680/'

let storybookProcess = null

export const stopStorybook = () => storybookProcess && storybookProcess.stop()

export const openStorybook = (webContents, showError) => {
	if (!storybookProcess) {
		webContents.executeJavaScript('window.showStorybookLoading(true)')

		const onError = (error) => showError(`Could not start Storybook and Playroom: ${error}`)

		const onStdOut = (data) => {
			if (data.toString().includes('DONE  Compiled successfully')) {
				webContents.executeJavaScript('window.showStorybookLoading(false)')
			}
		}

		const onStdErr = (data) => {
			const matches = data.toString().match(PARSE_STORYBOOK_WEBPACK_PROGRESS_REGEX)

			if (matches && matches.length) {
				webContents.executeJavaScript(`window.storybookLoadingProgress(${matches[1]})`)
			}
		}

		storybookProcess = new ChildProcess('npm run preview', { onError, onStdOut, onStdErr })
	}
	else if (storybookProcess) {
		if (!storybookProcess.running) {
			storybookProcess.start()
		}

		try {
			// eslint-disable-next-line
			NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(STORYBOOK_URL))
		}
		catch (error) {
			stopStorybook()
			showError(`Error opening Storybook in browser: ${error}`)
		}
	}
}

export const updateStorybookTempTheme = (themeData) => {
	try {
		const theme = themeProcessor(themeData)
		fs.writeFileSync(STORYBOOK_TEMP_THEME_FILEPATH, JSON.stringify(theme))
	}
	catch (error) {
		console.error('Error attempting to write plugin theme changes to the .storybook config directory: ', error)
	}
}
