import { getSystemFonts as getFonts } from '../services'

export const getSystemFonts = async (state, payload) => {
	try {
		const systemFonts = await getFonts()
		return systemFonts
	}
	catch (error) {
		throw Error('Failed to retrieve system fonts: ' + error)
	}
}
