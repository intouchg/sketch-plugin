import React from 'react'
import { Button } from '@i/components'
import { CloseIcon } from './Icons'

const CloseModalButton = ({
	onClick,
}: {
    onClick: () => void
}) => (
	<Button
		variant="Invisible"
		position="absolute"
		top="0"
		right="0"
		padding={2}
		zIndex={3}
		onClick={onClick}
	>
		<CloseIcon
			width="13px"
			fill="Text Light"
		/>
	</Button>
)

export { CloseModalButton }
