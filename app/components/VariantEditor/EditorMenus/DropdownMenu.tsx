import React, { useRef, useState, useEffect } from 'react'
import { Box } from '@i/components'
import { useOutsideClickListener } from '../../../hooks'

const DropdownMenu = ({
	show,
	setShow,
	children,
}: {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
}) => {
	const element = useRef<HTMLDivElement | null>(null)
	const [ active, setActive ] = useState(false)
	useEffect(() => setActive(show), [ show ])
	const closeMenu = () => active && setShow(false)
	useOutsideClickListener(element, closeMenu)

	if (!active) {
		return null
	}

	return (
		<Box
			ref={element}
			position="relative"
			width="0"
			zIndex={1}
			style={{ transform: 'translateX(-100%)' }}
		>
			<Box
				position="absolute"
				width="0"
			>
				{children}
			</Box>
		</Box>
	)
}

export { DropdownMenu }
