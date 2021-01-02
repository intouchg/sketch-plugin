import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import { Text, Box, Heading } from '@i/components'
import { InvisibleButton } from './Buttons'
import { CloseIcon } from './Icons'
import { setBannerMessage } from '../store'

const AnimatedBox = animated(Box)

const titleTexts = {
	info: 'Info',
	warn: 'Warning',
	success: 'Success',
	error: 'Error',
}

const backgroundColors = {
	info: 'Primary',
	warn: 'Caution Dark',
	success: 'Positive',
	error: 'Critical',
}

const MessageBanner = () => {
	const dispatch = useDispatch()
	const { show, type, message } = useSelector((state) => state.banner)
	const spring = useSpring({ maxHeight: show ? '100vh' : '0vh' })

	const resetBanner = () => {
		dispatch(setBannerMessage({ show: false, type, message }))
		setTimeout(() => dispatch(setBannerMessage({ show: false, message: '', type: 'info' })), 400)
	}

	return (
		<AnimatedBox
			top={0}
			left={0}
			width="100%"
			backgroundColor={backgroundColors[type]}
			overflow="hidden"
			zIndex={4}
			style={spring}
		>
			<Box padding={4}>
				<Heading
					marginBottom={1}
					color="Card"
				>
					{titleTexts[type]}
				</Heading>
				<Text color="Card">
					{message}
				</Text>
				<InvisibleButton
					position="absolute"
					top={0}
					right={0}
					margin={3}
					onClick={resetBanner}
				>
					<CloseIcon
						fill="Card"
						width="13px"
					/>
				</InvisibleButton>
			</Box>
		</AnimatedBox>
	)
}

export { MessageBanner }
