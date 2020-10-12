import React from 'react'
import { Box, Stack, Text } from '@i/components'
import { AccentText } from './index'

const ColorSwatch = ({
	id,
	name,
	value,
}: {
	id: string
    name: string
    value: string
}) => {
	return (
		<Box
			position="relative"
			width="196px"
			height="128px"
			borderRadius="Small"
			backgroundColor={value}
			border="1px solid Accent"
			marginX={2}
			marginBottom={4}
		>
			<Stack
				position="absolute"
				bottom="0"
				left="0"
				padding={3}
			>
				<Text variant="Secondary">
					{name}
				</Text>
				<AccentText color="Text">
					{value}
				</AccentText>
			</Stack>
		</Box>
	)
}

export { ColorSwatch }
