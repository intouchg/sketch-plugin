import React, { useEffect } from 'react'

export const useOutsideClickListener = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as any)) {
				callback()
			}
		}

		document.addEventListener('click', handleOutsideClick)

		return () => document.removeEventListener('click', handleOutsideClick)
	}, [ ref, callback ])
}
