import { getDocuments } from 'sketch'

export const getSketchDocumentNames = () => {
	try {
		const sketchDocuments = (getDocuments() || []).filter((document) => document.path)
		const documentNames = sketchDocuments.map(({ path }) => path.split('/').pop()).map((s) => decodeURI(s).split('.').slice(0, -1).pop())
		return documentNames
	}
	catch (error) {
		throw Error('Failed to retrieve Sketch document names: ' + error)
	}
}
