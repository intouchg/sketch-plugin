import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Stack, Heading, Box } from '@i/components'
import { ModalBackground } from '../ModalBackground'
import { InvisibleButton } from '../Buttons'
import { CloseIcon } from '../Icons'
import { ModalText } from '../Texts'
import { AzureStatusLabel } from './AzureStatusLabel'
import { AzureRepoInfo } from './AzureRepoInfo'
import { AzureLoginForm } from './AzureLoginForm'
import { forgetAzureCredentials } from '../../store'

const AzureModal = ({
	setShowAzureModal,
}: {
	setShowAzureModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const dispatch = useDispatch()
	const { username, accessToken } = useSelector((state) => state.azure.credentials)
	const connected = Boolean(username && accessToken)

	const signOut = () => dispatch(forgetAzureCredentials())

	return (
		<ModalBackground>
			<Flex
				width="560px"
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
					zIndex={3}
					onClick={() => setShowAzureModal(false)}
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
						<AzureStatusLabel connected={connected} />
					</Flex>
					{connected && (
						<>
							<AzureRepoInfo />
							<Box
								as={InvisibleButton}
								alignSelf="flex-end"
								marginTop={4}
								onClick={signOut}
							>
								<ModalText textDecoration="underline">
									Sign out of Azure
								</ModalText>
							</Box>
						</>
					)}
					{!connected && (
						<AzureLoginForm username={username} />
					)}
				</Stack>
			</Flex>
		</ModalBackground>
	)
}

export { AzureModal }
