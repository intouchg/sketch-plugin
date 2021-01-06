import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setOnlineStatus } from '../store'

export const useWindowInternetListener = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		if (window.navigator.onLine) {
			dispatch(setOnlineStatus(true))
		}

		const handleOffline = () => dispatch(setOnlineStatus(false))
		const handleOnline = () => dispatch(setOnlineStatus(true))

		window.addEventListener('offline', handleOffline)
		window.addEventListener('online', handleOnline)

		return () => {
			window.removeEventListener('offline', handleOffline)
			window.removeEventListener('online', handleOnline)
		}
	}, [ dispatch ])
}
