import React from 'react'
import { Box, Stack } from '@i/components'
import { calculateColorBrightness } from '@i/utility'
import { AccentText, SecondaryText } from './index'

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
			borderRadius="Medium"
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
				<SecondaryText color={labelColor}>
					{name}
				</SecondaryText>
				<AccentText color={labelColor}>
					{value}
				</AccentText>
			</Stack>
		</Box>
	)
}

export { ColorSwatch }
