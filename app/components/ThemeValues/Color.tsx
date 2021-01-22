import React from 'react'
import styled from 'styled-components'
import { useSpring, animated, config } from 'react-spring'
import { Box, Stack, Text } from '@i/components'
import { calculateColorBrightness } from '@i/utility'
import type { ThemeColor } from '@i/theme'

const TruncatedSecondaryText = styled(Text).attrs({ variant: 'Secondary' })`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`

const TruncatedAccentText = styled(Text).attrs({ variant: 'Accent' })`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`

const Color = ({
	name,
	value,
	selected,
}: ThemeColor & {
	selected: boolean | undefined
}) => {
	const labelColor = calculateColorBrightness(value) < 130 ? '#ffffff' : '#232323'
	const spring = useSpring({ config: config.wobbly, transform: `scale3d(${selected ? '0.9, 0.9, 0.9' : '1, 1, 1'})` })

	return (
		<animated.div
			style={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				...spring,
			}}
		>
			<Box
				position="absolute"
				width="100%"
				height="100%"
				borderRadius="Medium"
				backgroundColor={value}
				borderWidth="1px"
				borderStyle="solid"
				borderColor="Accent"
			>
				<Stack
					maxWidth="100%"
					position="absolute"
					bottom="0"
					left="0"
					padding={3}
					textAlign="left"
				>
					<TruncatedSecondaryText color={labelColor}>
						{name}
					</TruncatedSecondaryText>
					<TruncatedAccentText color={labelColor}>
						{value}
					</TruncatedAccentText>
				</Stack>
			</Box>
		</animated.div>
	)
}

export { Color }
