import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { Box, Stack } from '@i/components'
import { calculateColorBrightness } from '@i/utility'
import { AccentText, SecondaryText } from '../Texts'
import type { ThemeColor } from '@i/theme'

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
	name,
	value,
	selected,
}: ThemeColor & {
	selected: boolean | undefined
}) => {
	const labelColor = calculateColorBrightness(value) < 130 ? '#ffffff' : '#232323'
	const [ spring, setSpring ] = useSpring({ transform: `scale(${selected ? 0.9 : 1})` }, [ selected ])

	return (
		<animated.div
			style={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				...spring,
			}}
			onMouseMove={() => setSpring({ transform: 'scale(0.9)' })}
			onMouseLeave={() => setSpring({ transform: 'scale(1)' })}
		>
			<Box
				position="absolute"
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
