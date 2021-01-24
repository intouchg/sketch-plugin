import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setRecentProjects, setAzureCredentials, setSketchDocumentNames, setSystemFonts, setSettings } from '../store'
import { sendSketchCommand } from '../sketchApi'
import { useDisplayErrorBanner } from './useDisplayErrorBanner'

export const useInitializeSketchData = () => {
	const dispatch = useDispatch()
	const displayErrorBanner = useDisplayErrorBanner()

	useEffect(() => {
		sendSketchCommand('getRecentProjects', {})
			.then((recentProjects) => dispatch(setRecentProjects(recentProjects)))
			.catch((error) => displayErrorBanner(error))

		sendSketchCommand('getAzureCredentials', {})
			.then((credentials) => dispatch(setAzureCredentials(credentials)))
			.catch((error) => displayErrorBanner(error))

		sendSketchCommand('getSketchDocumentNames', {})
			.then((documentNames) => dispatch(setSketchDocumentNames(documentNames)))
			.catch((error) => displayErrorBanner(error))

		sendSketchCommand('getSystemFonts', {})
			.then((fontData) => dispatch(setSystemFonts(fontData)))
			.catch((error) => displayErrorBanner(error))

		sendSketchCommand('getLocalSettings', {})
			.then((settings) => dispatch(setSettings(settings)))
			.catch((error) => displayErrorBanner(error))
	}, [ dispatch, displayErrorBanner ])
}
