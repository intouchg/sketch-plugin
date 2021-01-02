import { getSketchDocumentNames } from '../../messages'
import { sendClientCommand } from '../index'

export const updateSketchDocumentNames = () => {
	const sketchDocumentNames = getSketchDocumentNames()
	sendClientCommand('setSketchDocumentNames', { documentNames: sketchDocumentNames }).catch((error) => console.error(error))
}
