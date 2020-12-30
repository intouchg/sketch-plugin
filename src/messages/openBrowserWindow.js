export const openBrowserWindow = async (state, payload, webContents, showError) => {
	try {
		const url = payload

		// eslint-disable-next-line
		NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url))
	}
	catch (error) {
		showError('Error opening browser window: ' + error)
	}
}
