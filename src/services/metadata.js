import fs from '@skpm/fs'

const METADATA_FILENAME = '.idsmetadata.json'
const METADATA_FILEPATH = './metadata/' + METADATA_FILENAME

export const readMetadata = () => {
	if (!fs.existsSync(METADATA_FILEPATH)) {
		fs.writeFileSync(METADATA_FILEPATH, JSON.stringify({}))
		return {}
	}

	const filedata = fs.readFileSync(METADATA_FILEPATH).toString('utf-8')
	return JSON.parse(filedata)
}

export const writeMetadata = (mergeMetadata) => {
	const metadata = readMetadata()
	const newMetadata = mergeMetadata(metadata)

	fs.writeFileSync(METADATA_FILEPATH, JSON.stringify(newMetadata, null, '\t'))
}
