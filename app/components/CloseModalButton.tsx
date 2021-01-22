import React from 'react'
import { InvisibleButton } from '@i/components'
import { CloseIcon } from './Icons'

const CloseModalButton = ({
	onClick,
}: {
    onClick: () => void
}) => (
	<InvisibleButton
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
	</InvisibleButton>
)

export { CloseModalButton }
