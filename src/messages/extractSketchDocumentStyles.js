import { getDocuments } from 'sketch'
import { extractSketchDocumentStyles as extract } from '../services'

export const extractSketchDocumentStyles = async (state, payload, webContents, showError) => {
	try {
		const sketchDocumentIndex = payload

		const sketchDocuments = (getDocuments() || []).filter((document) => document.path)
		const document = sketchDocuments[sketchDocumentIndex]
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
