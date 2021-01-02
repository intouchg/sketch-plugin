import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Stack, Heading, Input, Text } from '@i/components'
import { ModalBackground } from './ModalBackground'
import { InvisibleButton, PrimaryButton, TertiaryButton } from './Buttons'
import { CloseIcon } from './Icons'
import { AccentText } from './Texts'
import { LimitInteraction } from './LimitInteraction'
import { AzureStatusLabel } from './AzureStatusLabel'
import { sendSketchCommand, openBrowserWindow } from '../sketchApi'
import { useDisplayErrorBanner } from '../hooks'
import { setAzureCredentials } from '../store'

const AzureLoginModal = ({
	path,
	closeAzureLoginModal,
	openAzureStatusModal,
}: {
	path: string
	closeAzureLoginModal: () => void
	openAzureStatusModal: () => void
}) => {
	const dispatch = useDispatch()
	const { username, accessToken } = useSelector((state) => state.azure.credentials)
	const [ usernameValue, setUsernameValue ] = useState(username)
	const [ accessTokenValue, setAccessTokenValue ] = useState(accessToken)
	const [ error, setError ] = useState('')
	const displayErrorBanner = useDisplayErrorBanner()

	const loginToAzure = () => {
		setError('')

		sendSketchCommand('loginToAzure', {
			username: usernameValue,
			accessToken: accessTokenValue,
		})
			.then((credentials) => {
				dispatch(setAzureCredentials(credentials))
				closeAzureLoginModal()

				if (path === '/main') {
					openAzureStatusModal()
				}
			})
			.catch((error) => displayErrorBanner(error.includes('401') ? 'Authentication failed' : error))
	}

	return (
		<ModalBackground>
			<Flex
				width="560px"
				height="385px"
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
							textTransform="lowercase"
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
							textTransform="lowercase"
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
