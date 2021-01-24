import fs from '@skpm/fs'
import { readMetadata, METADATA_FILENAME } from '../services'

export const getLocalSettings = (state, payload) => {
	try {
		const { settings } = readMetadata()

		if (!settings) {
			throw Error(`Missing "settings" object in the ${METADATA_FILENAME} file.`)
		}

		const { defaultSaveDirectory } = settings

		if (!defaultSaveDirectory) {
			console.error(`The "defaultSaveDirectory" setting was not found in the ${METADATA_FILENAME} file.`)
		}
		else if (!fs.existsSync(defaultSaveDirectory)) {
			fs.mkdirSync(defaultSaveDirectory, { recursive: true })
		}

		return settings
	}
	catch (error) {
		throw Error('Failed to get local settings: ' + error)
	}
}
