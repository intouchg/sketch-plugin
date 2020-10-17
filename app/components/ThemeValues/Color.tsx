import React from 'react'
import styled from 'styled-components'
import { Box, Stack } from '@i/components'
import { calculateColorBrightness } from '@i/utility'
import { AccentText, SecondaryText } from '../Texts'

const TruncatedSecondaryText = styled(SecondaryText)`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`

const TruncatedAccentText = styled(AccentText)`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`

const Color = ({
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
			width="100%"
			height="100%"
			borderRadius="Medium"
			backgroundColor={value}
			border="1px solid"
			borderColor="Accent"
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
				<TruncatedAccentText color={labelColor}>
					{value}
				</TruncatedAccentText>
			</Stack>
		</Box>
	)
}

export { Color }
