import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setThemeData, setRecentProjects, setAzureCredentials, setSketchDocumentNames, setImportedSketchValues, setSystemFonts, setLocalProject, setBranchName, setBannerMessage } from '../store'
import { sendSketchCommand } from './index-old'
import { sendSketchCommand2 } from './index'

export const useGlobalSketchListeners = () => {
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
			.then((result) => dispatch(setRecentProjects(result)))
			.catch((error) => console.error(error))

		window.setThemeData = (themeData) => dispatch(setThemeData(themeData))
		window.setLocalProject = (filepath) => dispatch(setLocalProject(filepath)) && history.push('/main')
		window.setBranchName = (branchName) => dispatch(setBranchName(branchName))
		// window.setRecentProjects = (recentProjects) => dispatch(setRecentProjects(recentProjects))
		window.setAzureCredentials = (credentials) => dispatch(setAzureCredentials(credentials))
		window.setSketchDocumentNames = (sketchDocumentNames) => dispatch(setSketchDocumentNames(sketchDocumentNames))
		window.setImportedSketchValues = (styles) => dispatch(setImportedSketchValues(styles))
		window.setSystemFonts = (fonts) => dispatch(setSystemFonts(fonts))

		// sendSketchCommand('getRecentProjects')
		sendSketchCommand('getAzureCredentials')
		sendSketchCommand('getSketchDocumentNames')
		sendSketchCommand('getSystemFonts')

		return () => {
			delete window.setThemeData
			delete window.setLocalProject
			delete window.setBranchName
			// delete window.setRecentProjects
			delete window.setAzureCredentials
			delete window.setSketchDocumentNames
			delete window.setImportedSketchValues
			delete window.setSystemFonts
		}
	}, [ history, dispatch ])
}

export const useSelectLocalProject = () => {
	const history = useHistory()
	const dispatch = useDispatch()

	return () => sendSketchCommand2('selectLocalProject', {})
		.then(({ themeData, selectedProjectDirectory, recentProjects }) => {
			dispatch(setThemeData(themeData))
			dispatch(setLocalProject(selectedProjectDirectory))
			dispatch(setRecentProjects(recentProjects))
			history.push('/main')
		})
		.catch((error) => dispatch(setBannerMessage({ show: true, type: 'error', message: error })))
}
