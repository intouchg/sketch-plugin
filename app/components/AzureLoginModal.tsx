import React from 'react'
import { useSelector } from 'react-redux'
import { Flex, Stack, Heading, Input } from '@i/components'
import { ModalBackground } from './ModalBackground'
import { InvisibleButton, PrimaryButton } from './Buttons'
import { CloseIcon } from './Icons'
import { AccentText } from './Texts'
import { LimitInteraction } from './LimitInteraction'
import { AzureStatusLabel } from './AzureStatusLabel'

const AzureLoginModal = ({
	closeAzureLoginModal,
}: {
	closeAzureLoginModal: () => void
}) => {
	const { username, accessToken } = useSelector((state) => state.azure.credentials)

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
					<Flex alignItems="baseline">
						<Heading
							marginRight={2}
							marginBottom={4}
						>
							Azure
						</Heading>
						<AzureStatusLabel connected={Boolean(accessToken)} />
					</Flex>
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
						<LimitInteraction
							as={PrimaryButton}
							unlimit={Boolean(username && accessToken)}
						>
							Log In
						</LimitInteraction>
					</Flex>
				</Stack>
			</Flex>
		</ModalBackground>
	)
}

export { AzureLoginModal }
