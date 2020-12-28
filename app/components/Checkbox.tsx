import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Checkbox as CoreCheckbox } from '@i/components'
import { CheckmarkIcon } from './Icons'

const Checkbox = ({
	checked,
	disabled,
	onClick,
	...props
}: {
	checked: boolean
	disabled?: boolean
	onClick?: () => void
} & React.ComponentProps<typeof CoreCheckbox>) => (
	<CoreCheckbox
		checked={checked}
		onClick={!disabled ? onClick : undefined}
		{...props}
	>
		<Flex
			alignItems="center"
			justifyContent="center"
			width="24px"
			height="24px"
			backgroundColor={disabled ? 'Background' : 'Card'}
			border="1px solid"
			borderColor="Accent"
			borderRadius="Medium"
		>
			{checked && (
				<CheckmarkIcon
					fill={disabled ? 'Text Light' : undefined}
					width="16px"
				/>
			)}
		</Flex>
	</CoreCheckbox>
)

const CheckboxPlaceholder = styled(Box)`
	box-sizing: content-box;
	width: 24px;
	height: 24px;
`

export {
	Checkbox,
	CheckboxPlaceholder,
}
