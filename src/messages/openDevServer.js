import { openDevServer as open } from '../services'

export const openDevServer = (state, payload, webContents, showError) => {
	const { selectedProjectDirectory } = state

	open(webContents, showError, selectedProjectDirectory)
}
