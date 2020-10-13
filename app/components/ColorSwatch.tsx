import React from 'react'
import { Box, Stack, Text } from '@i/components'
import { calculateColorBrightness } from '@i/utility'
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
	const labelColor = calculateColorBrightness(value) < 130 ? '#ffffff' : '#232323'

	return (
		<Box
			position="relative"
			width="196px"
			height="128px"
			borderRadius="Small"
			backgroundColor={value}
			border="1px solid"
			borderColor="Accent"
			marginX={2}
			marginBottom={4}
		>
			<Stack
				position="absolute"
				bottom="0"
				left="0"
				padding={3}
			>
				<Text
					variant="Secondary"
					color={labelColor}
				>
					{name}
				</Text>
				<AccentText color={labelColor}>
					{value}
				</AccentText>
			</Stack>
		</Box>
	)
}

export { ColorSwatch }
