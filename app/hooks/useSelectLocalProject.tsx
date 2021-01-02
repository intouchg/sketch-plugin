import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setThemeData, setRecentProjects, setLocalProject, setBannerMessage } from '../store'
import { sendSketchCommand } from '../sketchApi'
import { useDisplayErrorBanner } from './useDisplayErrorBanner'

export const useSelectLocalProject = (filepath?: string) => {
	const history = useHistory()
	const dispatch = useDispatch()
	const displayErrorBanner = useDisplayErrorBanner()

	return () => sendSketchCommand('selectLocalProject', filepath ? { filepath } : {})
		.then(({ themeData, selectedProjectDirectory, recentProjects }) => {
			if (!selectedProjectDirectory) {
				return
			}

			dispatch(setThemeData(themeData))
			dispatch(setLocalProject(selectedProjectDirectory))
			dispatch(setRecentProjects(recentProjects))
			history.push('/main')
		})
		.catch((error) => displayErrorBanner(error))
}
