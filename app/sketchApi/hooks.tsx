import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setThemeData, setRecentProjects, setAzureCredentials, setSketchDocumentNames, setImportedSketchValues, setSystemFonts, setLocalProject, setBranchName, setBannerMessage } from '../store'
import { sendSketchCommand2 } from './index'

export const useInitializeSketchData = () => {
	const history = useHistory()
	const dispatch = useDispatch()

	useEffect(() => {
		window.sketchCommand = ({ commandId, type, payload }) => {
			console.log(type, payload)

			switch (type) {
				case 'setRecentProjects': {
					dispatch(setRecentProjects(payload))
					break
				}

				default: {
					break
				}
			}
		}

		sendSketchCommand2('getRecentProjects', {})
			.then((recentProjects) => dispatch(setRecentProjects(recentProjects)))
			.catch((error) => dispatch(setBannerMessage({ show: true, type: 'error', message: error })))

		sendSketchCommand2('getAzureCredentials', {})
			.then((credentials) => dispatch(setAzureCredentials(credentials)))
			.catch((error) => dispatch(setBannerMessage({ show: true, type: 'error', message: error })))

		sendSketchCommand2('getSketchDocumentNames', {})
			.then((documentNames) => dispatch(setSketchDocumentNames(documentNames)))
			.catch((error) => dispatch(setBannerMessage({ show: true, type: 'error', message: error })))

		sendSketchCommand2('getSystemFonts', {})
			.then((fontData) => dispatch(setSystemFonts(fontData)))
			.catch((error) => dispatch(setBannerMessage({ show: true, type: 'error', message: error })))

		window.setBranchName = (branchName) => dispatch(setBranchName(branchName))
		window.setImportedSketchValues = (styles) => dispatch(setImportedSketchValues(styles))

		return () => {
			delete window.setBranchName
			delete window.setImportedSketchValues
		}
	}, [ history, dispatch ])
}

export const useSelectLocalProject = (filepath?: string) => {
	const history = useHistory()
	const dispatch = useDispatch()

	return () => sendSketchCommand2('selectLocalProject', filepath ? { filepath } : {})
		.then(({ themeData, selectedProjectDirectory, recentProjects }) => {
			dispatch(setThemeData(themeData))
			dispatch(setLocalProject(selectedProjectDirectory))
			dispatch(setRecentProjects(recentProjects))
			history.push('/main')
		})
		.catch((error) => dispatch(setBannerMessage({ show: true, type: 'error', message: error })))
}
