import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setBannerState } from '../store'

export const useDisplayErrorBanner = () => {
	const dispatch = useDispatch()

	const displayErrorBanner = useCallback((message: string, title?: string, timeout?: number) => {
		dispatch(setBannerState({ show: true, type: 'error', message }))

		if (timeout !== undefined) {
			setTimeout(() => dispatch(setBannerState({ show: false, type: 'error', title, message })), timeout)
		}
	}, [ dispatch ])

	return displayErrorBanner
}
