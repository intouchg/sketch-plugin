import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSketchDocumentNames } from '../store'
import { useDisplayErrorBanner } from './useDisplayErrorBanner'

export const useWindowSketchListener = () => {
	const dispatch = useDispatch()
	const displayErrorBanner = useDisplayErrorBanner()

	useEffect(() => {
		// Receives commands sent from the Sketch plugin back end to the React webview front end
		window.sketchCommand = ({ commandId, type, payload }) => {
			try {
				let result

				switch (type) {
					case 'setSketchDocumentNames': {
						dispatch(setSketchDocumentNames(payload))
						result = true
						break
					}

					default: {
						break
					}
				}

				result = result === undefined ? {} : result

				window.postMessage('resolveCommand', JSON.stringify({ commandId, result }))
			}
			catch (error) {
				displayErrorBanner(`Error in window.sketchCommand ${commandId} ${type}: ` + error)
			}
		}
	}, [ dispatch, displayErrorBanner ])
}
