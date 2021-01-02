import React from 'react'
import { sendSketchCommand } from '../index'
import { useDisplayErrorBanner } from './useDisplayErrorBanner'

export const useOpenDevServer = () => {
	const displayErrorBanner = useDisplayErrorBanner()

	return () => sendSketchCommand('openDevServer', {})
		.then(() => {})
		.catch((error) => displayErrorBanner(error))
}
