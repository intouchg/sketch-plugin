import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setBannerState } from '../store'

export const useDisplayErrorBanner = () => {
	const dispatch = useDispatch()

	const displayErrorBanner = useCallback((message: string, title?: string, timeout?: number) => {
		if (message.includes('The Internet connection appears to be offline.')) {
			title = 'Internet required'
			message = 'Restore internet connectivity and try again.'
		}

		dispatch(setBannerState({ show: true, type: 'error', title, message }))

		if (timeout !== undefined) {
			setTimeout(() => dispatch(setBannerState({ show: false, type: 'error', title, message })), timeout)
		}
	}, [ dispatch ])

	return displayErrorBanner
}
