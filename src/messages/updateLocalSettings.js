import { writeMetadata } from '../services'

export const updateLocalSettings = (state, payload) => {
	try {
		writeMetadata((metadata) => ({
			...metadata,
			settings: {
				...metadata.settings,
				...payload,
			},
		}))

		return true
	}
	catch (error) {
		throw Error('Failed to update local settings: ' + error)
	}
}
