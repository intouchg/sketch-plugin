import { getSketchDocumentNames } from '../../messages'
import { sendClientCommand } from '../index'

export const updateSketchDocumentNames = async () => {
	try {
		const sketchDocumentNames = getSketchDocumentNames()
		await sendClientCommand('setSketchDocumentNames', sketchDocumentNames)
	}
	catch (error) {
		console.error('Failed to update Sketch document names: ' + error)
	}
}
