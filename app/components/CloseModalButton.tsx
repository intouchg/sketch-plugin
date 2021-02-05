import React from 'react'
import { Button } from '@i/components'
import { Icon } from './Icon'

const CloseModalButton = ({
	onClick,
	...props
}: React.ComponentProps<typeof Button> & {
    onClick: () => void
}) => {
	const { width, ...rest } = props

	return (
		<Button
			invisible
			position="absolute"
			top="0"
			right="0"
			display="flex"
			alignItems="center"
			padding={2}
			zIndex={3}
			{...rest}
			onClick={onClick}
		>
			<Icon
				icon="Close"
				width={width ? width : '13px'}
				fill="Text Light"
			/>
		</Button>
	)
}

export { CloseModalButton }
