import fs from '@skpm/fs'
import path from '@skpm/path'
import dialog from '@skpm/dialog'
import { configFilename, validateConfig } from '@i/theme'
import { updateStorybookTempTheme, writeRecentProjectMetadata, openGitRepo, hasCommittedRemoteChanges, hasUncommittedLocalChanges, commitChanges, hasCommittedLocalChanges, pullChanges } from '../services'

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

	const configData = fs.readFileSync(configFilepath).toString()
	const config = validateConfig(JSON.parse(configData))

	if (!config) {
		throw Error(`Invalid format for ${configFilename} config file at filepath: ${configFilepath}`)
	}

	const filepaths = {
		values: config.values,
		variants: config.variants,
	}

	// Load each theme file referenced in the config file (except the "output" file) and populate themeData
	Object.keys(filepaths).forEach((key) => {
		const lowercaseKey = key.toLowerCase()
		const filepath = path.resolve(selectedProjectDirectory, config[key])

		if (!fs.existsSync(filepath)) {
			throw Error(`Could not locate theme ${key.toLowerCase()} file at filepath: ${filepath}`)
		}

		themeFilepaths[lowercaseKey] = filepath
		const fileData = fs.readFileSync(filepath)
		themeData[lowercaseKey] = JSON.parse(fileData)
	})

	const recentProjects = writeRecentProjectMetadata({ filepath: selectedProjectDirectory })
	const branchName = await openGitRepo(selectedProjectDirectory)

	try {
		if (await hasCommittedRemoteChanges()) {
			if (await hasUncommittedLocalChanges()) {
				await commitChanges('IDS pre-pull automated save')
			}

			await pullChanges()
		}
	}
	catch (error) {
		throw Error('Failed to pull remote changes: ' + error)
	}

	state.themeFilepaths = themeFilepaths
	state.themeData = themeData
	state.selectedProjectDirectory = selectedProjectDirectory

	// updateStorybookTempTheme(themeData)

	return {
		themeData,
		selectedProjectDirectory,
		branchName,
		recentProjects,
	}
}
