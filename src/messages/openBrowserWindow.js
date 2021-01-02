export const openBrowserWindow = async (state, payload) => {
	try {
		const { url } = payload

		// eslint-disable-next-line
		NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url))

		return true
	}
	catch (error) {
		throw Error('Failed to open browser window: ' + error)
	}
}
