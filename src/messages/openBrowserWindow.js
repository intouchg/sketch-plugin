export const openBrowserWindow = async (showError, url) => {
	try {
		// eslint-disable-next-line
		NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url))
	}
	catch (error) {
		showError('Error opening browser window: ' + error)
	}
}
