// import dialog from '@skpm/dialog'
// import { cloneAzureGitRepo as clone } from '../services'

// export const cloneAzureGitRepo = async (state, payload, webContents, showError) => {
// 	const { remoteUrl } = payload

// 	let selectedCloneDirectory = null
// 	selectedCloneDirectory = dialog.showOpenDialogSync({ properties: [ 'openDirectory' ] })[0]

// 	if (selectedCloneDirectory) {
// 		await clone(remoteUrl, selectedCloneDirectory, webContents, showError)
// 	}
// }
