import { openDevServer as open } from '../services'

export const openDevServer = (webContents, showError, selectedProjectDirectory) => {
	open(webContents, showError, selectedProjectDirectory)
}
