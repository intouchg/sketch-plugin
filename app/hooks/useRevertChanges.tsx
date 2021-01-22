import React, { useCallback } from 'react'
import { useDispatch, batch } from 'react-redux'
import { useDisplayErrorBanner } from './useDisplayErrorBanner'
import { sendSketchCommand } from '../sketchApi'
import { setThemeData, setBannerState, setHasLocalChanges } from '../store'

export const useRevertChanges = () => {
	const dispatch = useDispatch()
	const displayErrorBanner = useDisplayErrorBanner()

	const revertChanges = useCallback(() => {
		sendSketchCommand('resetLocalChanges', {})
			.then((themeData) => batch(() => {
				dispatch(setHasLocalChanges(false))
				dispatch(setThemeData({ ...themeData, skipResetChangeHistory: true }))
			}))
			.catch((error) => displayErrorBanner(error))
	}, [ dispatch, displayErrorBanner ])

	const promptToRevert = useCallback(() => {
		dispatch(setBannerState({
			show: true,
			type: 'warn',
			title: 'Are you sure you want to revert?',
			message: 'You will lose all unsaved changes. This cannot be undone.',
			confirmText: 'Revert',
			cancelText: 'Cancel',
			onConfirm: revertChanges,
		}))
	}, [ dispatch, revertChanges ])

	return promptToRevert
}
