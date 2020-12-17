import { extractSketchDocumentStyles as extract } from '../services'

export const extractSketchDocumentStyles = async (webContents, showError, document) => {
	try {
		const styles = extract(document)

		if (styles) {
			webContents.executeJavaScript(`window.setImportedSketchValues(${JSON.stringify(styles)})`)
		}
	}
	catch (error) {
		const message = `Error attempting to import Sketch document styles: ${error}`
		console.error(message)
		showError(message)
	}
}
