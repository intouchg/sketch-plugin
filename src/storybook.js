import fs from '@skpm/fs'
import path from '@skpm/path'
import { spawn, exec } from '@skpm/child_process'
import { themeProcessor } from '@i/theme'

const PARSE_STORYBOOK_WEBPACK_PROGRESS_REGEX = /\[webpack\.Progress\] (\d*)%/
const STORYBOOK_TEMP_THEME_FILENAME = '.storybook/temp-theme.json'
const STORYBOOK_TEMP_THEME_FILEPATH = path.resolve(process.cwd(), '../' + STORYBOOK_TEMP_THEME_FILENAME)
const STORYBOOK_URL = 'http://localhost:64680/'

let storybookRunning = false
let storybookProcess = null

export const updateStorybookTempTheme = (themeData) => {
	try {
		const theme = themeProcessor(themeData)
		fs.writeFileSync(STORYBOOK_TEMP_THEME_FILEPATH, JSON.stringify(theme))
	}
	catch (error) {
		console.error('Error attempting to write plugin theme changes to the .storybook config directory: ', error)
	}
}

export const killStorybook = () => {
	if (storybookProcess) {
		storybookProcess.kill()
	}

	storybookProcess = null
	storybookRunning = false
}

export const openStorybook = (webContents, displayErrorInWebview) => {
	if (!storybookRunning) {
		try {
			webContents.executeJavaScript('window.showStorybookLoading(true)')
			storybookRunning = true
			storybookProcess = spawn('npm', [ 'run', 'preview' ], { shell: true, cwd: process.cwd() })

			storybookProcess.on('error', (error) => {
				storybookProcess = null
				storybookRunning = false
				throw new Error('Error spawning new storybookProcess: ', error)
			})

			storybookProcess.stdout.on('data', (data) => {
				if (data.toString('utf-8').includes('DONE  Compiled successfully')) {
					webContents.executeJavaScript('window.showStorybookLoading(false)')
				}
			})

			storybookProcess.stderr.on('data', (data) => {
				const matches = data.toString('utf-8').match(PARSE_STORYBOOK_WEBPACK_PROGRESS_REGEX)

				if (matches && matches.length) {
					webContents.executeJavaScript(`window.storybookLoadingProgress(${matches[1]})`)
				}
			})

			storybookProcess.on('close', (code) => {
				storybookProcess = null
				storybookRunning = false
				console.info('"storybookProcess" child process exited with code ' + code)
			})
		}
		catch (error) {
			displayErrorInWebview(`Could not start Storybook and Playroom: ${error}`)
		}
	}
	else {
		try {
			exec(`open -a "Google Chrome" ${STORYBOOK_URL}`)
		}
		catch (error) {
			killStorybook()
			displayErrorInWebview(`Could not open Storybook in Google Chrome: ${error}`)
		}
	}
}
