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

const checkerboardBackgroundStyles = {
	backgroundSize: '30px 30px',
	backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0',
	backgroundImage: `
		linear-gradient(45deg, #dddddd 25%, transparent 25%),
		linear-gradient(-45deg, #dddddd 25%, transparent 25%),
		linear-gradient(45deg, transparent 75%, #dddddd 75%),
		linear-gradient(-45deg, transparent 75%, #dddddd 75%)
	`,
}

const ALPHA_THRESHOLD = 0.33
const BRIGHTNESS_THRESHOLD = 130

const Color = ({
	name,
	value,
	selected,
}: ThemeColor & {
	selected: boolean | undefined
}) => {
	const spring = useSpring({ config: config.wobbly, transform: `scale3d(${selected ? '0.9, 0.9, 0.9' : '1, 1, 1'})` })

	let alpha = 1

	if (value.includes('rgba')) {
		alpha = Number((Number(value.split(',')[3].trim().split('%')[0]) / 100).toFixed(2))
	}

	const labelColor = alpha < ALPHA_THRESHOLD ? '#232323' : calculateColorBrightness(value) < BRIGHTNESS_THRESHOLD ? '#ffffff' : '#232323'

	return (
		<animated.div
			style={{
				position: 'absolute',
				top: '0',
				bottom: '0',
				left: '0',
				right: '0',
				width: '100%',
				height: '100%',
				...spring,
			}}
		>
			<Box
				position="absolute"
				width="100%"
				height="100%"
				backgroundColor="Card"
				borderRadius={3}
				{...checkerboardBackgroundStyles}
			>
				<Box
					position="absolute"
					width="100%"
					height="100%"
					borderRadius={3}
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
			</Box>
		</animated.div>
	)
}

export { Color }
