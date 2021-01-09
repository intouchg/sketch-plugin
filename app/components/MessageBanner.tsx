import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import { Text, Box, Stack, Flex, Heading, Button } from '@i/components'
import { InvisibleButton } from './Buttons'
import { CloseIcon } from './Icons'
import { setBannerState, initialBannerState } from '../store'

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
	const bannerState = useSelector((state) => state.banner)
	const { show, type, message, confirmText, cancelText, onConfirm, onCancel } = bannerState
	const isPrompt = confirmText || cancelText || onConfirm || onCancel
	const spring = useSpring({ maxHeight: !show ? '0px' : isPrompt ? '200px' : '120px' })
	const textColor = textColors[type]
	const backgroundColor = backgroundColors[type]

	const resetBanner = () => {
		dispatch(setBannerState({ ...bannerState, show: false }))
		setTimeout(() => dispatch(setBannerState(initialBannerState)), 600)
	}

	const cancel = () => {
		if (onCancel) {
			onCancel()
		}

		resetBanner()
	}

	const confirm = () => {
		if (onConfirm) {
			onConfirm()
		}

		resetBanner()
	}

	return (
		<AnimatedBox
			top={0}
			left={0}
			width="100%"
			backgroundColor={backgroundColor}
			overflow="scroll"
			zIndex={4}
			style={spring}
		>
			<Stack padding={4}>
				<Heading
					marginBottom={2}
					color={textColor}
				>
					{titleTexts[type]}
				</Heading>
				<Text
					color={textColor}
					fontSize={3}
				>
					{String(message)}
				</Text>
				{isPrompt && (
					<Flex marginTop={4}>
						{(onCancel || cancelText) && (
							<Button
								color={textColor}
								borderColor={textColor}
								backgroundColor="transparent"
								marginRight={4}
								onClick={cancel}
							>
								{cancelText || 'Cancel'}
							</Button>
						)}
						{(onConfirm || confirmText) && (
							<Button
								color={backgroundColor}
								borderColor={textColor}
								backgroundColor={textColor}
								onClick={confirm}
							>
								{confirmText || 'Confirm'}
							</Button>
						)}
					</Flex>
				)}
			</Stack>
			<InvisibleButton
				position="absolute"
				top={0}
				right={0}
				margin={3}
				onClick={cancel}
			>
				<CloseIcon
					fill={textColor}
					width="13px"
				/>
			</InvisibleButton>
		</AnimatedBox>
	)
}

export { MessageBanner }
