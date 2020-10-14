import ChildProcess from '../ChildProcess'
import fs from '@skpm/fs'
import path from '@skpm/path'

const FONTS_DATA_FILENAME = '.fontsdata.json'
const FONTS_DATA_STORAGE_FILEPATH = path.resolve('./Contents/Sketch/metadata/')
const FONTS_FILEPATH = path.resolve(FONTS_DATA_STORAGE_FILEPATH, FONTS_DATA_FILENAME)

if (!fs.existsSync(FONTS_DATA_STORAGE_FILEPATH)) {
	fs.mkdirSync(FONTS_DATA_STORAGE_FILEPATH, { recursive: true })
}

if (!fs.existsSync(FONTS_FILEPATH)) {
	fs.writeFileSync(FONTS_FILEPATH, JSON.stringify({}))
}

export const getSystemFonts = () => new Promise((resolve, reject) => {
	const onClose = () => {
		const data = fs.readFileSync(FONTS_FILEPATH).toString()
		resolve(JSON.parse(data))
	}

	const systemFontsProcess = new ChildProcess(`system_profiler -json SPFontsDataType > ${FONTS_FILEPATH}`, { onClose }, true)
})
