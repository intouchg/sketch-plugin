import React from 'react'
import { useDispatch, batch } from 'react-redux'
import { sendSketchCommand } from '../sketchApi'
import { useDisplayErrorBanner } from './useDisplayErrorBanner'
import { setLoadingState } from '../store'

export const useOpenDevServer = () => {
	const dispatch = useDispatch()
	const displayErrorBanner = useDisplayErrorBanner()

	return () => {
		dispatch(setLoadingState({ show: true }))

		sendSketchCommand('openDevServer', {})
			.then(() => dispatch(setLoadingState({ show: false })))
			.catch((error) => batch(() => {
				dispatch(setLoadingState({ show: true }))
				displayErrorBanner(error)
			}))
	}
}
