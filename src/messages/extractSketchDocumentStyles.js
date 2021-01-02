import { getDocuments } from 'sketch'
import { extractSketchDocumentStyles as extract } from '../services'

export const extractSketchDocumentStyles = async (state, payload) => {
	try {
		const { sketchDocumentIndex } = payload

		const sketchDocuments = (getDocuments() || []).filter((document) => document.path)
		const document = sketchDocuments[sketchDocumentIndex]
		const styles = extract(document)

		return styles
	}
	catch (error) {
		throw Error('Failed to import Sketch document styles: ' + error)
	}
}
