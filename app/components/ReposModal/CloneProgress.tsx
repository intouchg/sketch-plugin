import React from 'react'
import { animated } from 'react-spring'
import { Flex, Stack, Text } from '@i/components'
import type { SpringValue } from 'react-spring'

const CloneProgress = ({
	progress,
	message,
}: {
    progress: SpringValue<number>
    message: string
}) => (
	<Flex
		alignItems="center"
		justifyContent="center"
		width="100%"
		padding={3}
		backgroundColor="Background"
	>
		<Stack
			alignItems="center"
			justifyContent="center"
			position="fixed"
			top="0"
			bottom="0"
			left="0"
			right="0"
			backgroundColor="Card"
			zIndex={4}
		>
			<Text marginBottom={4}>
				{message}
			</Text>
			<svg
				style={{ margin: '0 12px', width: 120, height: 120 }}
				viewBox="0 0 51 51"
				strokeWidth="6.5"
				fill="transparent"
				strokeLinecap="butt"
				strokeLinejoin="round"
				strokeDasharray={138}
			>
				<circle
					stroke="#f8f8f8"
					transform="translate(25.500000, 25.500000) rotate(-90.000000) translate(-25.500000, -25.500000)"
					cx="25.5"
					cy="25.5"
					r="22"
				/>
				<animated.circle
					strokeDashoffset={progress.to((p) => (1 - p) * 138)}
					stroke="#0091d4"
					transform="translate(25.500000, 25.500000) rotate(-90.000000) translate(-25.500000, -25.500000)"
					cx="25.5"
					cy="25.5"
					r="22"
				/>
			</svg>
		</Stack>
	</Flex>
)

export { CloneProgress }
