import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { Flex, Text, Box, Heading } from '@i/components'
import { InvisibleButton } from './Buttons'
import { CloseIcon } from './Icons'
import type { Message } from '../sketchApi'

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
	const [ showMessage, setShowMessage ] = useState(false)
	const [ { message, type }, setMessage ] = useState<Message>({ message: '', type: 'info' })
	const spring = useSpring({ maxHeight: showMessage ? '100vh' : '0vh' })

	const resetBanner = () => {
		setShowMessage(false)
		setTimeout(() => setMessage({ message: '', type: 'info' }), 400)
	}

	useEffect(() => {
		window.displayMessage = (messageData) => {
			setMessage(messageData)
			setShowMessage(true)
		}

		return () => void delete window.displayMessage
	}, [ setShowMessage, setMessage ])

	return (
		<AnimatedBox
			top={0}
			left={0}
			width="100%"
			backgroundColor={backgroundColors[type]}
			overflow="hidden"
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
