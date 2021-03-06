import fs from '@skpm/fs'
import path from '@skpm/path'
import dialog from '@skpm/dialog'
import { configFilename, validateConfig } from '@intouchg/theme'
import { updateStorybookTempTheme, writeRecentProjectMetadata, openGitRepo, hasLocalChanges, getTimestampOfLastPush } from '../services'

export const selectLocalProject = async (state, payload) => {
	const { filepath } = payload
	let selectedProjectDirectory = filepath
	const themeFilepaths = {}
	const themeData = {}

	if (!filepath) {
		selectedProjectDirectory = dialog.showOpenDialogSync({ properties: [ 'openDirectory' ] })[0]
	}

	if (!selectedProjectDirectory) {
		return
	}

	const configFilepath = path.resolve(selectedProjectDirectory, configFilename)

	// Check for .idsconfig.json file
	if (!fs.existsSync(configFilepath)) {
		throw Error(`The folder you selected is not a valid Intouch Design System project. Could not locate a ${configFilename} config file at filepath: ${configFilepath}`)
	}

	const configData = JSON.parse(fs.readFileSync(configFilepath).toString())

	if (configData.entry) {
		return selectLocalProject(state, { filepath: path.resolve(selectedProjectDirectory, configData.entry) })
	}

	const config = validateConfig(configData)

	if (!config) {
		throw Error(`Invalid format for ${configFilename} config file at filepath: ${configFilepath}`)
	}

	const filepaths = {
		values: config.values,
		variants: config.variants,
	}

	// Load each theme file referenced in the config file (except the "output" file) and populate themeData
	Object.keys(filepaths).forEach((key) => {
		const filepath = path.resolve(selectedProjectDirectory, config[key])

		if (!fs.existsSync(filepath)) {
			throw Error(`Could not locate theme "${key}" file at filepath: ${filepath}`)
		}

		themeFilepaths[key] = filepath
		const fileData = fs.readFileSync(filepath)
		themeData[key] = JSON.parse(fileData)
	})

	const recentProjects = writeRecentProjectMetadata({ filepath: selectedProjectDirectory })
	const branchName = await openGitRepo(selectedProjectDirectory)
	const localChanges = await hasLocalChanges()
	const lastPushTime = await getTimestampOfLastPush()

	state.themeFilepaths = themeFilepaths
	state.themeData = themeData
	state.selectedProjectDirectory = selectedProjectDirectory

	// updateStorybookTempTheme(themeData)

	return {
		themeData,
		selectedProjectDirectory,
		branchName,
		hasLocalChanges: localChanges,
		lastPushTime,
		recentProjects,
	}
}
