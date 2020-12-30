import { getSystemFonts as getFonts } from '../services'

export const getSystemFonts = async (state, payload, webContents, showError) => {
	try {
		const systemFonts = await getFonts()
		webContents.executeJavaScript(`window.setSystemFonts(${JSON.stringify(systemFonts)})`)
	}
	catch (error) {
		showError('Error retrieving system fonts: ' + error)
	}
}
