import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { undoAction, redoAction } from '../store'

export const useWindowUndoListener = (allowUndo: boolean) => {
	const dispatch = useDispatch()

	useEffect(() => {
		const undoRedoListener = (event: KeyboardEvent) => {
			if (allowUndo && event.metaKey && event.key === 'z') {
				// preventDefault stops the undo/redo keybinds from
				// unintentionally affecting native text inputs
				event.preventDefault()

				if (event.shiftKey) {
					dispatch(redoAction())
				}
				else {
					dispatch(undoAction())
				}
			}
		}

		window.addEventListener('keydown', undoRedoListener)

		return () => window.removeEventListener('keydown', undoRedoListener)
	}, [ dispatch, allowUndo ])
}
