import React from 'react'
import { useDispatch } from 'react-redux'
import { setBannerMessage } from '../../store'

export const useDisplayErrorBanner = () => {
	const dispatch = useDispatch()

	return (message: string, timeout?: number) => {
		dispatch(setBannerMessage({ show: true, type: 'error', message }))

		if (timeout !== undefined) {
			setTimeout(() => dispatch(setBannerMessage({ show: false, type: 'error', message })), timeout)
		}
	}
}
