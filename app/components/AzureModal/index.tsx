import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Stack, Heading, Button, Text } from '@i/components'
import { ModalBackground } from '../ModalBackground'
import { CloseModalButton } from '../CloseModalButton'
import { AzureLoginForm } from './AzureLoginForm'
import { AzureStatusLabel } from '../AzureStatusLabel'
import { AzureRepoInfo } from './AzureRepoInfo'
import { forgetAzureCredentials, setAzureModalState } from '../../store'
import { sendSketchCommand } from '../../sketchApi'
import { useDisplayErrorBanner } from '../../hooks'

const AzureModal = () => {
	const dispatch = useDispatch()
	const azureModalState = useSelector((state) => state.azure.azureModalState)
	const online = useSelector((state) => state.azure.online)
	const { username, accessToken } = useSelector((state) => state.azure.credentials)
	const connected = Boolean(username && accessToken)
	const redirectToReposModal = azureModalState === 'redirectToRepos'
	const [ showLoginForm, setShowLoginForm ] = useState(redirectToReposModal)
	const displayErrorBanner = useDisplayErrorBanner()

	useEffect(() => setShowLoginForm(redirectToReposModal), [ redirectToReposModal ])

	if (!azureModalState) {
		return null
	}

	const signOut = () => sendSketchCommand('forgetAzureCredentials', {})
		.then(() => dispatch(forgetAzureCredentials()))
		.catch((error) => displayErrorBanner(error))

	const closeModal = () => {
		dispatch(setAzureModalState(null))
		setShowLoginForm(false)
	}

	return (
		<ModalBackground>
			<Flex
				width="560px"
				padding={5}
				backgroundColor="Background"
				boxShadow="Medium"
				borderRadius="Large"
			>
				<CloseModalButton onClick={closeModal} />
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
								<Text
									variant="Modal Accent"
									fontSize={2}
								>
									{username.split('@')[0]}
								</Text>
								<Text
									variant="Modal Accent"
									fontSize={2}
								>
									&nbsp;|&nbsp;
								</Text>
								<Button
									variant="Invisible"
									onClick={signOut}
								>
									<Text
										variant="Modal Accent"
										fontSize={2}
										textDecoration="underline"
									>
										Sign out
									</Text>
								</Button>
							</Flex>
						)}
						{!showLoginForm && !connected && (
							<Button
								variant="Invisible"
								onClick={() => setShowLoginForm(true)}
							>
								<Text
									variant="Modal Accent"
									color="Primary"
									fontSize={2}
									textDecoration="underline"
								>
									Sign in
								</Text>
							</Button>
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
							redirectToReposModal={redirectToReposModal}
						/>
					)}
				</Stack>
			</Flex>
		</ModalBackground>
	)
}

export { AzureModal }
