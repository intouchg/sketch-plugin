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

	return async () => {
		try {
			const { themeData, selectedProjectDirectory, branchName, recentProjects } = await sendSketchCommand('selectLocalProject', { filepath })

			if (!selectedProjectDirectory) {
				return
			}

			batch(() => {
				dispatch(setThemeData(themeData))
				dispatch(setLocalProject(selectedProjectDirectory))
				dispatch(setBranchName(branchName))
				dispatch(setRecentProjects(recentProjects))
			})

			const hasUpdates = await sendSketchCommand('checkForRemoteUpdates', {})

			if (hasUpdates) {
				dispatch(setLoadingState({ show: true, message: 'Downloading updates ...' }))
				await sendSketchCommand('downloadRemoteUpdates', {})
			}

			batch(() => {
				dispatch(setLoadingState({ show: false, message: '' }))
				navigate('main')
			})
		}
		catch (error) {
			displayErrorBanner(error)
		}
	})
}
