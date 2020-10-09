import { extractSketchDocumentStyles as extract } from '../services'

export const extractSketchDocumentStyles = async (webContents, showError) => {
	try {
		const styles = extract()
		webContents.executeJavaScript(`window.receiveImportedSketchStyles(${JSON.stringify(styles)})`)
	}
	catch (error) {
		const message = `Error attempting to import Sketch document styles: ${error}`
		console.error(message)
		webContents.executeJavaScript('window.setSaveThemeDataResult(false)')
		showError(message)
	}
}
