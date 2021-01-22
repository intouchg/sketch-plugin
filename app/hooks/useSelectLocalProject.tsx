import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, batch } from 'react-redux'
import { setThemeData, setRecentProjects, setLocalProject, setBranchName, setHasLocalChanges, setLoadingState, setBannerState, setHasRemoteChanges, setCheckingHasRemoteChanges, setLastPushTime } from '../store'
import { sendSketchCommand } from '../sketchApi'
import { useDisplayErrorBanner } from './useDisplayErrorBanner'

export const useSelectLocalProject = (filepath?: string) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const displayErrorBanner = useDisplayErrorBanner()

	const selectLocalProject = useCallback(async () => {
		try {
			const {
				themeData,
				selectedProjectDirectory,
				branchName,
				hasLocalChanges,
				lastPushTime,
				recentProjects,
			} = await sendSketchCommand('selectLocalProject', { filepath })

			if (!selectedProjectDirectory) {
				return
			}

			batch(() => {
				dispatch(setThemeData(themeData))
				dispatch(setLocalProject(selectedProjectDirectory))
				dispatch(setBranchName(branchName))
				dispatch(setHasLocalChanges(hasLocalChanges))
				dispatch(setRecentProjects(recentProjects))
				dispatch(setLastPushTime(lastPushTime ? new Date(lastPushTime) : null))
				dispatch(setCheckingHasRemoteChanges(true))
				navigate('main')
			})

			const checkingTimeout = setTimeout(() => dispatch(setCheckingHasRemoteChanges(false)), 60000)

			sendSketchCommand('checkHasRemoteChanges', {})
				.then((hasRemoteChanges) => {
					batch(() => {
						clearTimeout(checkingTimeout)
						dispatch(setCheckingHasRemoteChanges(false))
						dispatch(setHasRemoteChanges(hasRemoteChanges))
					})
				})
				.catch((error) => displayErrorBanner(error))
		}
		catch (error) {
			displayErrorBanner(error)
		}
	}, [ filepath, dispatch, navigate, displayErrorBanner ])

	return selectLocalProject
}
