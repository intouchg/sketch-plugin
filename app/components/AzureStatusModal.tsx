import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Stack, Heading, Box } from '@i/components'
import { ModalBackground } from './ModalBackground'
import { InvisibleButton, PrimaryButton, SecondaryButton } from './Buttons'
import { CloseIcon } from './Icons'
import { AccentText } from './Texts'
import { AzureStatusLabel } from './AzureStatusLabel'
import { resetAzureState } from '../store'

const ModalText = styled(AccentText)`
	letter-spacing: 0;
	text-transform: none;
`

const AzureStatusModal = ({
	closeAzureStatusModal,
}: {
	closeAzureStatusModal: () => void
}) => {
	const history = useHistory()
	const dispatch = useDispatch()
	const { credentials, localProject, branchName, lastPush } = useSelector((state) => state.azure)
	const { username, accessToken } = credentials

	const forgetAzureCredentials = () => {
		dispatch(resetAzureState())
		history.push('/welcome')
	}

	return (
		<ModalBackground>
			<Flex
				width="560px"
				height="317px"
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
					<Flex alignItems="baseline">
						<Heading
							marginRight={2}
							marginBottom={4}
						>
							Azure
						</Heading>
						<AzureStatusLabel connected={Boolean(username && accessToken)} />
					</Flex>
					<Box
						padding={4}
						backgroundColor="Card"
						borderRadius="Large"
					>
						<Heading
							variant="Tertiary"
							color="Primary"
							marginBottom={2}
						>
							{localProject.split('/').pop()}
						</Heading>
						<Flex marginBottom={3}>
							<Flex>
								<ModalText>
									Branch:&nbsp;
								</ModalText>
								<ModalText
									color="Text"
									fontWeight="Bold"
								>
									{branchName}
								</ModalText>
							</Flex>
							<ModalText>
								&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
							</ModalText>
							<Flex>
								<ModalText>
									Last saved:&nbsp;
								</ModalText>
								<ModalText
									color="Text"
									fontWeight="Bold"
								>
									14 minutes ago
								</ModalText>
							</Flex>
						</Flex>
						<Flex>
							<Box
								as={PrimaryButton}
								flexGrow={1}
								marginRight={3}
							>
								Save to Azure
							</Box>
							<SecondaryButton>
								Revert
							</SecondaryButton>
						</Flex>
					</Box>
					<Box
						as={InvisibleButton}
						alignSelf="flex-end"
						marginTop={4}
						onClick={forgetAzureCredentials}
					>
						<ModalText textDecoration="underline">
							Sign out of Azure
						</ModalText>
					</Box>
				</Stack>
			</Flex>
		</ModalBackground>
	)
}

export { AzureStatusModal }
