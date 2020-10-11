import React from 'react'
import { Box, Stack, Text } from '@i/components'
import { AccentText } from './index'

const ColorSwatch = ({
	name,
	color,
}: {
    name: string
    color: string
}) => {
	return (
		<Box
			position="relative"
			width="196px"
			height="128px"
			borderRadius="Small"
			backgroundColor={color}
			border="1px solid Accent"
		>
			<Stack
				position="absolute"
				bottom="0"
				left="0"
				padding={3}
			>
				<Text>
					{name}
				</Text>
				<AccentText>
					{color}
				</AccentText>
			</Stack>
		</Box>
	)
}

export { ColorSwatch }
