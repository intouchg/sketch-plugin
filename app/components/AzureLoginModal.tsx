import React from 'react'
import { Flex, Stack, Heading } from '@i/components'
import { ModalBackground } from './ModalBackground'
import { InvisibleButton, PrimaryButton } from './Buttons'
import { CloseIcon } from './Icons'
import { AccentText } from './Texts'

const AzureLoginModal = ({
	closeAzureLoginModal,
}: {
	closeAzureLoginModal: () => void
}) => {
	return (
		<ModalBackground>
			<Flex
				width="560px"
				height="364px"
				padding={5}
				backgroundColor="Background"
				boxShadow="Medium"
				borderRadius="Large"
			>
				<InvisibleButton
					position="absolute"
					top="0"
					right="0"
					padding={2}
					zIndex={4}
					onClick={closeAzureLoginModal}
				>
					<CloseIcon
						width="13px"
						fill="Accent"
					/>
				</InvisibleButton>
				<Stack
					flexGrow={1}
					overflow="hidden"
				>
					<Heading marginBottom={4}>
						Azure
					</Heading>
					<Stack marginBottom={3}>
						<AccentText marginBottom={2}>
							Email Address
						</AccentText>
					</Stack>
					<Stack marginBottom={4}>
						<AccentText marginBottom={2}>
							Access Token
						</AccentText>
					</Stack>
					<Flex alignSelf="start">
						<PrimaryButton>
							Log In
						</PrimaryButton>
					</Flex>
				</Stack>
			</Flex>
		</ModalBackground>
	)
}

export { AzureLoginModal }
