import React from 'react'
import { Flex, Checkbox as CoreCheckbox } from '@i/components'
import { CheckmarkIcon } from './Icons'

const Checkbox = ({
	checked,
	onClick,
	...props
}: {
    checked: boolean
	onClick?: () => void
} & React.ComponentProps<typeof CoreCheckbox>) => (
	<CoreCheckbox
		checked={checked}
		onClick={onClick}
		{...props}
	>
		<Flex
			alignItems="center"
			justifyContent="center"
			width="24px"
			height="24px"
			backgroundColor="Card"
			border="1px solid"
			borderColor="Accent"
			borderRadius="Medium"
		>
			{checked && (<CheckmarkIcon width="16px" />)}
		</Flex>
	</CoreCheckbox>
)

export { Checkbox }
