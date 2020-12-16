import React from 'react'
import { Flex, Stack, Heading } from '@i/components'
import { ModalBackground } from './ModalBackground'
import { InvisibleButton, PrimaryButton } from './Buttons'
import { CloseIcon } from './Icons'
import { AccentText } from './Texts'

const AzureStatusModal = ({
	closeAzureStatusModal,
}: {
	closeAzureStatusModal: () => void
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
					onClick={closeAzureStatusModal}
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
					<PrimaryButton>
						Save to Azure
					</PrimaryButton>
				</Stack>
			</Flex>
		</ModalBackground>
	)
}

export { AzureStatusModal }
