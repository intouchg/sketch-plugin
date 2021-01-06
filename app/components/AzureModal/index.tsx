import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Stack, Heading, Box, Button } from '@i/components'
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
	const [ showLoginForm, setShowLoginForm ] = useState(false)
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
							<AzureStatusLabel connected={connected} />
						</Flex>
						{!showLoginForm && (
							<>
								{connected && (
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
								{!connected && (
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
							</>
						)}
					</Flex>
					{!showLoginForm && (
						<AzureRepoInfo connected={connected} />
					)}
					{showLoginForm && (
						<AzureLoginForm
							username={username}
							setShowLoginForm={setShowLoginForm}
						/>
					)}
				</Stack>
			</Flex>
		</ModalBackground>
	)
}

export { AzureModal }
