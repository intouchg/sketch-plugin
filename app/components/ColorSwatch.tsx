import React from 'react'
import styled from 'styled-components'
import { Box, Stack } from '@i/components'
import { calculateColorBrightness } from '@i/utility'
import { AccentText, SecondaryText } from './Texts'

const TruncatedSecondaryText = styled(SecondaryText)`
	overflow: hidden;
	text-overflow: ellipsis;
`

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
			flexGrow={1}
		>
			<Stack
				maxWidth="100%"
				position="absolute"
				bottom="0"
				left="0"
				padding={3}
			>
				<TruncatedSecondaryText color={labelColor}>
					{name}
				</TruncatedSecondaryText>
				<AccentText color={labelColor}>
					{value}
				</AccentText>
			</Stack>
		</Box>
	)
}

export { ColorSwatch }
