import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import { Text, Box, Heading } from '@i/components'
import { InvisibleButton } from './Buttons'
import { CloseIcon } from './Icons'
import { setBannerState } from '../store'

const AnimatedBox = animated(Box)

const titleTexts = {
	info: 'Info',
	warn: 'Warning',
	success: 'Success',
	error: 'Error',
}

const backgroundColors = {
	info: 'Primary',
	warn: 'Caution',
	success: 'Positive',
	error: 'Critical',
}

const textColors = {
	info: 'Card',
	warn: 'Caution Dark',
	success: 'Positive Dark',
	error: 'Critical Dark',
}

const MessageBanner = () => {
	const dispatch = useDispatch()
	const { show, type, message } = useSelector((state) => state.banner)
	const spring = useSpring({ maxHeight: show ? '120px' : '0px' })
	const textColor = textColors[type]

	const resetBanner = () => {
		dispatch(setBannerState({ show: false, type, message }))
		setTimeout(() => dispatch(setBannerState({ show: false, type: 'info', message: '' })), 600)
	}

	return (
		<AnimatedBox
			top={0}
			left={0}
			width="100%"
			backgroundColor={backgroundColors[type]}
			overflow="scroll"
			zIndex={4}
			style={spring}
		>
			<Box padding={4}>
				<Heading
					marginBottom={1}
					color={textColor}
				>
					{titleTexts[type]}
				</Heading>
				<Text color={textColor}>
					{String(message)}
				</Text>
				<InvisibleButton
					position="absolute"
					top={0}
					right={0}
					margin={3}
					onClick={resetBanner}
				>
					<CloseIcon
						fill={textColor}
						width="13px"
					/>
				</InvisibleButton>
			</Box>
		</AnimatedBox>
	)
}

export { MessageBanner }
