import fs from '@skpm/fs'
import path from '@skpm/path'
import dialog from '@skpm/dialog'
import { configFilename } from '@i/theme'

export const selectNewProjectDirectory = (state, payload) => {
	const selectedProjectDirectory = dialog.showOpenDialogSync({ properties: [ 'openDirectory' ] })[0]

	if (!selectedProjectDirectory) {
		return ''
	}

	const configFilepath = path.resolve(selectedProjectDirectory, configFilename)

	// Check for .idsconfig.json file to avoid overwriting existing IDS project
	if (fs.existsSync(configFilepath)) {
		throw Error('The folder you selected is already an Intouch Design System project.')
	}

	return selectedProjectDirectory
}
