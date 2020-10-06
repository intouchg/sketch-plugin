import React, { useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { Stack, Text } from '@i/components'

const StorybookLoading = () => {
	const [ { progress }, setSpring ] = useSpring(() => ({ progress: 0 }))

	useEffect(() => {
		window.storybookLoadingProgress = (progress) => setSpring({ progress: progress / 100 })
		return () => void delete window.storybookLoadingProgress
	}, [])

	return (
		<Stack
			position="fixed"
			bottom={0}
			left={0}
			padding={2}
			zIndex={100}
			alignItems="center"
			justifyContent="space-evenly"
		>
			<Text
				color="grey.3"
				fontSize="11px"
				fontWeight="bold"
				textAlign="center"
			>
				Loading<br />
				Storybook...
			</Text>
			<animated.svg
				style={{ margin: '0 12px', width: 64, height: 64 }}
				viewBox="0 0 51 51"
				strokeWidth="6.5"
				fill="transparent"
				stroke="rgb(88, 140, 244)"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeDasharray={156}
				strokeDashoffset={progress.interpolate((v) => (1 - v) * 156)}
			>
				<circle
					transform="translate(25.500000, 25.500000) rotate(-90.000000) translate(-25.500000, -25.500000)"
					cx="25.5"
					cy="25.5"
					r="18.5"
				/>
			</animated.svg>
		</Stack>
	)
}

export { StorybookLoading }
