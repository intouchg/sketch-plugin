import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, batch } from 'react-redux'
import { setThemeData, setRecentProjects, setLocalProject, setBranchName, setLoadingState } from '../store'
import { sendSketchCommand } from '../sketchApi'
import { useDisplayErrorBanner } from './useDisplayErrorBanner'

export const useSelectLocalProject = (filepath?: string) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const displayErrorBanner = useDisplayErrorBanner()

	return () => sendSketchCommand('selectLocalProject', { filepath })
		.then(({ themeData, selectedProjectDirectory, branchName, recentProjects }) => batch(() => {
			if (!selectedProjectDirectory) {
				return
			}

			dispatch(setThemeData(themeData))
			dispatch(setLocalProject(selectedProjectDirectory))
			dispatch(setBranchName(branchName))
			dispatch(setRecentProjects(recentProjects))
			dispatch(setLoadingState({ show: true, message: 'Downloading updates ...' }))

			sendSketchCommand('checkForRemoteUpdates', {})
				.then(() => batch(() => {
					dispatch(setLoadingState({ show: false, message: '' }))
					navigate('main')
				}))
				.catch((error) => displayErrorBanner(error))
		}))
		.catch((error) => displayErrorBanner(error))
}
