import dialog from '@skpm/dialog'
import { cloneAzureGitRepo as clone } from '../services'

export const cloneAzureGitRepo = async (webContents, showError, { remoteUrl }) => {
	let selectedCloneDirectory = null
	selectedCloneDirectory = dialog.showOpenDialogSync({ properties: [ 'openDirectory' ] })[0]

	if (selectedCloneDirectory) {
		await clone(remoteUrl, selectedCloneDirectory, webContents, showError)
	}
}
