import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Flex, Stack, Heading, Input, Text } from '@i/components'
import { ModalBackground } from './ModalBackground'
import { InvisibleButton, PrimaryButton, TertiaryButton } from './Buttons'
import { CloseIcon } from './Icons'
import { AccentText } from './Texts'
import { LimitInteraction } from './LimitInteraction'
import { AzureStatusLabel } from './AzureStatusLabel'
import { sketchRequest, openBrowserWindow } from '../sketchApi'

const AzureLoginModal = ({
	path,
	closeAzureLoginModal,
	openAzureStatusModal,
}: {
	path: string
	closeAzureLoginModal: () => void
	openAzureStatusModal: () => void
}) => {
	const { username, accessToken } = useSelector((state) => state.azure.credentials)
	const [ usernameValue, setUsernameValue ] = useState(username)
	const [ accessTokenValue, setAccessTokenValue ] = useState(accessToken)
	const [ error, setError ] = useState('')

	useEffect(() => {
		window.handleAzureLoginResult = (success) => {
			if (success) {
				closeAzureLoginModal()

				if (path === '/main') {
					openAzureStatusModal()
				}
			}
			else {
				setError('Authentication failed.')
			}
		}

		return () => void delete window.handleAzureLoginResult
	})

	const loginToAzure = () => {
		setError('')

		sketchRequest('loginToAzure', {
			username: usernameValue,
			accessToken: accessTokenValue,
		})
	}

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
						<AzureStatusLabel connected={Boolean(username && accessToken)} />
					</Flex>
					<Stack marginBottom={3}>
						<AccentText marginBottom={2}>
							Email Address
						</AccentText>
						<Input
							type="text"
							autoCorrect="off"
							autoCapitalize="none"
							padding={3}
							borderRadius="Large"
							value={usernameValue}
							onChange={(event) => setUsernameValue(event.target.value)}
						/>
					</Stack>
					<Stack marginBottom={3}>
						<AccentText marginBottom={2}>
							Access Token
						</AccentText>
						<Input
							type="text"
							autoCorrect="off"
							autoCapitalize="none"
							padding={3}
							borderRadius="Large"
							value={accessTokenValue}
							onChange={(event) => setAccessTokenValue(event.target.value)}
						/>
					</Stack>
					<Flex
						alignItems="baseline"
						marginBottom={4}
					>
						<Text>
							Don&apos;t have a token?&nbsp;
						</Text>
						<TertiaryButton
							fontSize={2}
							onClick={() => openBrowserWindow('https://google.com')}
						>
							Follow the Azure setup user guide.
						</TertiaryButton>
					</Flex>
					<Flex alignSelf="start">
						<LimitInteraction
							as={PrimaryButton}
							unlimit={Boolean(usernameValue && accessTokenValue)}
							onClick={loginToAzure}
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
