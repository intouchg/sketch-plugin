import React, { useCallback } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useDisplayErrorBanner } from './useDisplayErrorBanner'
import { sendSketchCommand } from '../sketchApi'
import { setLoadingState, setBannerState, setHasLocalChanges, setHasRemoteChanges, setLastPushTime } from '../store'

export const useSaveChanges = () => {
	const dispatch = useDispatch()
	const hasRemoteChanges = useSelector((state) => state.azure.hasRemoteChanges)
	const displayErrorBanner = useDisplayErrorBanner()

	const saveChanges = useCallback(async () => {
		try {
			if (hasRemoteChanges) {
				return dispatch(setBannerState({ show: true, type: 'info', title: 'Updates available', message: 'You must download updates before saving.' }))
			}

			dispatch(setLoadingState({ show: true, message: 'Saving changes ...' }))

			const {
				didSaveChanges,
				needsToUpdate,
				lastPushTime: lastPushTimeString,
			} = await sendSketchCommand('saveChangesToAzure', {})

			if (!didSaveChanges && needsToUpdate) {
				return batch(() => {
					dispatch(setLoadingState({ show: false }))
					dispatch(setHasRemoteChanges(true))
					dispatch(setBannerState({ show: true, type: 'info', title: 'Updates available', message: 'You must download updates before saving.' }))
				})
			}

			if (didSaveChanges) {
				batch(() => {
					dispatch(setHasLocalChanges(false))
					dispatch(setLastPushTime(lastPushTimeString ? new Date(lastPushTimeString) : null))
					dispatch(setLoadingState({ show: false }))
					dispatch(setBannerState({ show: true, type: 'success', title: 'Save success', message: 'Saved changes to Azure.' }))
				})
			}
		}
		catch (error) {
			dispatch(setLoadingState({ show: false }))
			displayErrorBanner(error)
		}
	}, [ dispatch, hasRemoteChanges, displayErrorBanner ])

	return saveChanges
}
