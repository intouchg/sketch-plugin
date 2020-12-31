import { getWebview } from 'sketch-module-web-view/remote'
import { getDocuments } from 'sketch'
import { WEBVIEW_IDENTIFIER } from '../index'

export const getSketchDocumentNames = () => {
	const sketchDocuments = (getDocuments() || []).filter((document) => document.path)
	const webview = getWebview(WEBVIEW_IDENTIFIER)

	if (webview) {
		const documentNames = sketchDocuments.map(({ path }) => path.split('/').pop()).map((s) => decodeURI(s).split('.').slice(0, -1).pop())
		webview.webContents.executeJavaScript(`window.setSketchDocumentNames(${JSON.stringify(documentNames)})`)
	}
}
