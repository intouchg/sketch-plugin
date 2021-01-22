import React, { useCallback } from 'react'
import { useDispatch, batch } from 'react-redux'
import { setBannerState, setLoadingState, setThemeData, setHasRemoteChanges } from '../store'
import { sendSketchCommand } from '../sketchApi'
import { useDisplayErrorBanner } from './useDisplayErrorBanner'

export const useDownloadUpdates = () => {
	const dispatch = useDispatch()
	const displayErrorBanner = useDisplayErrorBanner()

	const downloadUpdates = useCallback(async () => {
		try {
			dispatch(setLoadingState({ show: true, message: 'Downloading updates ...' }))
			const { themeData, didReceiveChanges, hasMergeConflict } = await sendSketchCommand('downloadRemoteChanges', {})

			batch(() => {
				dispatch(setLoadingState({ show: false }))
				dispatch(setThemeData(themeData))

				if (hasMergeConflict) {
					return dispatch(setBannerState({ show: true, type: 'warn', title: 'Merge conflict', message: 'Failed to download updates. A merge conflict occurred. Please contact a developer for support or revert your changes.' }))
				}

				dispatch(setHasRemoteChanges(false))

				if (didReceiveChanges) {
					dispatch(setBannerState({ show: true, type: 'success', title: 'Update success', message: 'Downloaded updates from Azure.' }))
				}
				else {
					dispatch(setBannerState({ show: true, type: 'info', title: 'No updates available', message: 'Your project is already up to date.' }))
				}
			})
		}
		catch (error) {
			dispatch(setLoadingState({ show: false }))
			displayErrorBanner(error)
		}
	}, [ dispatch, displayErrorBanner ])

	return downloadUpdates
}
