import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Stack, Heading } from '@i/components'
import { ModalBackground } from '../ModalBackground'
import { InvisibleButton } from '../Buttons'
import { ModalText } from '../Texts'
import { AzureLoginForm } from './AzureLoginForm'
import { AzureStatusLabel } from '../AzureStatusLabel'
import { AzureRepoInfo } from './AzureRepoInfo'
import { forgetAzureCredentials } from '../../store'
import { CloseModalButton } from '../CloseModalButton'
import type { AzureModalState } from '../../App'

const AzureModal = ({
	azureModalState,
	setAzureModalState,
	setShowReposModal,
}: {
	azureModalState: AzureModalState
	setAzureModalState: React.Dispatch<React.SetStateAction<AzureModalState>>
	setShowReposModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const dispatch = useDispatch()
	const online = useSelector((state) => state.azure.online)
	const { username, accessToken } = useSelector((state) => state.azure.credentials)
	const connected = Boolean(username && accessToken)
	const redirectToReposModal = azureModalState === 'redirectToRepos'
	const [ showLoginForm, setShowLoginForm ] = useState(redirectToReposModal)

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
				<CloseModalButton onClick={() => setAzureModalState(null)} />
				<Stack flexGrow={1}>
					<Flex
						alignItems="baseline"
						justifyContent="space-between"
						width="100%"
						marginBottom={4}
					>
						<Flex>
							<Heading marginRight={2}>
								Azure
							</Heading>
							<AzureStatusLabel
								online={online}
								connected={connected}
							/>
						</Flex>
						{!showLoginForm && connected && (
							<Flex>
								<ModalText fontSize={2}>
									cody.persinger
								</ModalText>
								<ModalText fontSize={2}>
									&nbsp;|&nbsp;
								</ModalText>
								<InvisibleButton
									as={ModalText}
									fontSize={2}
									textDecoration="underline"
									onClick={signOut}
								>
									Sign out
								</InvisibleButton>
							</Flex>
						)}
						{!showLoginForm && !connected && (
							<InvisibleButton
								as={ModalText}
								color="Primary"
								fontSize={2}
								textDecoration="underline"
								onClick={() => setShowLoginForm(true)}
							>
								Sign in
							</InvisibleButton>
						)}
					</Flex>
					{!showLoginForm && (
						<AzureRepoInfo
							online={online}
							connected={connected}
						/>
					)}
					{showLoginForm && (
						<AzureLoginForm
							online={online}
							username={username}
							accessToken={accessToken}
							setShowLoginForm={setShowLoginForm}
							setAzureModalState={setAzureModalState}
							redirectToReposModal={redirectToReposModal}
							setShowReposModal={setShowReposModal}
						/>
					)}
				</Stack>
			</Flex>
		</ModalBackground>
	)
}

export { AzureModal }
