import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setThemeData, setRecentProjects, setLocalProject, setBranchName } from '../store'
import { sendSketchCommand } from '../sketchApi'
import { useDisplayErrorBanner } from './useDisplayErrorBanner'

export const useSelectLocalProject = (filepath?: string) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const displayErrorBanner = useDisplayErrorBanner()

	return () => sendSketchCommand('selectLocalProject', filepath ? { filepath } : {})
		.then(({ themeData, selectedProjectDirectory, branchName, recentProjects }) => {
			if (!selectedProjectDirectory) {
				return
			}

			dispatch(setThemeData(themeData))
			dispatch(setLocalProject(selectedProjectDirectory))
			dispatch(setBranchName(branchName))
			dispatch(setRecentProjects(recentProjects))
			navigate('main')
		})
		.catch((error) => displayErrorBanner(error))
}
