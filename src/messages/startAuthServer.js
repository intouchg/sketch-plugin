import { startAuthServer as start } from '../services'

const OAUTH_SERVER_PORT = 8089

export const startAuthServer = (webContents, displayErrorInWebview) => {
	start(OAUTH_SERVER_PORT, webContents, displayErrorInWebview)
}
