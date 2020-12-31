import fs from '@skpm/fs'
import path from '@skpm/path'
import dialog from '@skpm/dialog'
import { configFilename } from '@i/theme'

export const selectNewProjectDirectory = (state, payload, webContents, showError) => {
	const selectedProjectDirectory = dialog.showOpenDialogSync({ properties: [ 'openDirectory' ] })[0]

	if (!selectedProjectDirectory) {
		return
	}

	let error = false
	const configFilepath = path.resolve(selectedProjectDirectory, configFilename)

	// Check for .idsconfig.json file to avoid overwriting existing IDS project
	if (fs.existsSync(configFilepath)) {
		error = true
		showError('The folder you selected is already an Intouch Design System project.')
	}

	// If filepath was selected and no error occurred, send filepath to React app
	if (!error) {
		webContents.executeJavaScript(`window.setNewProjectDirectory(${JSON.stringify(selectedProjectDirectory)})`)
	}
}
