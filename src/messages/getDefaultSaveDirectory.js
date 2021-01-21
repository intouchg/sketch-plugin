import fs from '@skpm/fs'
import { readMetadata, METADATA_FILENAME } from '../services'

export const getDefaultSaveDirectory = (state, payload) => {
	try {
		const { defaultSaveDirectory } = readMetadata()

		if (!fs.existsSync(defaultSaveDirectory)) {
			fs.mkdirSync(defaultSaveDirectory, { recursive: true })
		}

		if (!defaultSaveDirectory) {
			console.error(`The "defaultSaveDirectory" setting was not found in the ${METADATA_FILENAME} file.`)
		}

		return defaultSaveDirectory || ''
	}
	catch (error) {
		throw Error('Failed to get default save directory: ' + error)
	}
}
