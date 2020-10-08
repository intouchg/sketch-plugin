import fs from '@skpm/fs'
import path from '@skpm/path'
import dialog from '@skpm/dialog'
import { configFilename, validateConfig } from '@i/theme'
import { updateStorybookTempTheme } from '../services'

export const selectGitRepo = (webContents, displayErrorInWebview) => {
	let selectedProjectDirectory = null
	const themeFilepaths = {}
	const themeData = {}

	selectedProjectDirectory = dialog.showOpenDialogSync({ properties: [ 'openDirectory' ] })[0]

	if (!selectedProjectDirectory) {
		return
	}

	let error = false
	const configFilepath = path.resolve(selectedProjectDirectory, configFilename)

	// Check for .idsconfig file
	if (!fs.existsSync(configFilepath)) {
		error = true
		displayErrorInWebview(`The folder you selected is not a valid Intouch Design System project. Could not locate a ${configFilename} config file at filepath: ${configFilepath}`)
	}

	const configData = fs.readFileSync(configFilepath).toString('utf-8')
	const config = validateConfig(JSON.parse(configData))

	if (!config) {
		error = true
		displayErrorInWebview(`Invalid format for ${configFilename} config file at filepath: ${configFilepath}`)
	}

	const filepaths = {
		values: config.values,
		groups: config.groups,
		components: config.components,
		variants: config.variants,
	}

	// Load each theme file referenced in the config file (except the "output" file) and populate themeData
	Object.keys(filepaths).forEach((key) => {
		const lowercaseKey = key.toLowerCase()
		const filepath = path.resolve(selectedProjectDirectory, config[key])

		if (!fs.existsSync(filepath)) {
			error = true
			displayErrorInWebview(`Could not locate theme ${key.toLowerCase()} file at filepath: ${filepath}`)
		}

		themeFilepaths[lowercaseKey] = filepath
		const fileData = fs.readFileSync(filepath)
		themeData[lowercaseKey] = JSON.parse(fileData)
	})

	// If all necessary config and files exist, call setThemeData in the React app
	if (!error) {
		webContents.executeJavaScript(`window.setThemeData(${JSON.stringify(themeData)})`)
		updateStorybookTempTheme(themeData)
	}

	return { themeFilepaths, themeData }
}
