import { extractSketchDocumentStyles as extract } from '../services'

export const extractSketchDocumentStyles = async (webContents, showError, document) => {
	try {
		const styles = extract(document)
		webContents.executeJavaScript(`window.setSketchImportData(${JSON.stringify(styles)})`)
	}
	catch (error) {
		const message = `Error attempting to import Sketch document styles: ${error}`
		console.error(message)
		webContents.executeJavaScript('window.setSaveThemeDataResult(false)')
		showError(message)
	}
}
