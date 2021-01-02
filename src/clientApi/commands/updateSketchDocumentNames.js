import { getSketchDocumentNames } from '../../messages'
import { sendClientCommand } from '../index'

export const updateSketchDocumentNames = () => {
	try {
		const sketchDocumentNames = getSketchDocumentNames()
		sendClientCommand('setSketchDocumentNames', sketchDocumentNames).catch((error) => console.error(error))
	}
	catch (error) {
		console.error('Failed to update Sketch document names: ' + error)
	}
}
