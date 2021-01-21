import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, batch } from 'react-redux'
import { Flex, Stack, Input, Text } from '@i/components'
import { PrimaryButton, SecondaryButton, TertiaryButton } from '../Buttons'
import { AccentText } from '../Texts'
import { sendSketchCommand, openBrowserWindow } from '../../sketchApi'
import { setAzureCredentials, setAzureModalState, setLoadingState, setShowReposModal } from '../../store'

const AzureLoginInput = styled(Input).attrs<
	typeof Input
>((props) => ({
	autoCorrect: 'off',
	autoCapitalize: 'off',
	autoComplete: 'off',
	spellCheck: 'false',
}))<{
	error: boolean
}>`
	border: 1px solid ${(props) => props.error ? props.theme.colors.Critical : 'transparent'};
	text-transform: lowercase;
	transform: scale3d(1, 1, 1);
`

const OFFLINE_ERROR_MESSAGE = 'Please restore internet connectivity before attempting to sign in.'
const AUTHENTICATION_ERROR_MESSAGE = 'Authentication failed. Please check your username and access token and try again.'

const AzureLoginForm = ({
	online,
	username,
	accessToken,
	setShowLoginForm,
	redirectToReposModal,
}: {
	online: boolean
	username: string
	accessToken: string
	setShowLoginForm: React.Dispatch<React.SetStateAction<boolean>>
	redirectToReposModal: boolean
}) => {
	const dispatch = useDispatch()
	const [ usernameValue, setUsernameValue ] = useState(username)
	const [ accessTokenValue, setAccessTokenValue ] = useState('')
	const [ connected, setConnected ] = useState(username && accessToken)
	const [ error, setError ] = useState('')
	useEffect(() => setError(!online ? OFFLINE_ERROR_MESSAGE : ''), [ online ])
	useEffect(() => setConnected(username && accessToken), [ username, accessToken ])

	if (connected) {
		if (redirectToReposModal) {
			dispatch(setAzureModalState(null))
			dispatch(setShowReposModal(true))
		}
		else {
			setShowLoginForm(false)
		}
	}

	const loginToAzure = () => {
		if (!usernameValue || !accessTokenValue) {
			return setError(AUTHENTICATION_ERROR_MESSAGE)
		}

		dispatch(setLoadingState({ show: true, message: 'Authenticating ...' }))

		sendSketchCommand('loginToAzure', { username: usernameValue, accessToken: accessTokenValue })
			.then((credentials) => batch(() => {
				dispatch(setLoadingState({ show: false }))
				dispatch(setAzureCredentials(credentials))

				if (redirectToReposModal) {
					dispatch(setAzureModalState(null))
					dispatch(setShowReposModal(true))
				}
				else {
					setShowLoginForm(false)
				}
			}))
			.catch((error) => batch(() => {
				dispatch(setLoadingState({ show: false }))
				setError(error.includes('401') ? AUTHENTICATION_ERROR_MESSAGE : error)
			}))
	}

	return (
		<Stack>
			<Stack marginBottom={3}>
				<AccentText marginBottom={2}>
					Email Address
				</AccentText>
				<AzureLoginInput
					error={Boolean(error)}
					value={usernameValue}
					onChange={(event) => setUsernameValue(event.target.value)}
				/>
			</Stack>
			<Stack marginBottom={3}>
				<AccentText marginBottom={2}>
					Access Token
				</AccentText>
				<AzureLoginInput
					error={Boolean(error)}
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
					textDecoration="underline"
					onClick={() => openBrowserWindow('https://google.com')}
				>
					Follow the Azure setup user guide.
				</TertiaryButton>
			</Flex>
			{error && (
				<Flex
					justifyContent="center"
					width="100%"
					marginBottom={4}
				>
					<Text color="Critical">
						{error}
					</Text>
				</Flex>
			)}
			<Flex
				alignItems="center"
				justifyContent="space-between"
				width="100%"
			>
				<SecondaryButton onClick={() => redirectToReposModal ? dispatch(setAzureModalState(null)) : setShowLoginForm(false)}>
					Back
				</SecondaryButton>
				<PrimaryButton onClick={loginToAzure}>
					Sign In
				</PrimaryButton>
			</Flex>
		</Stack>
	)
}

export { AzureLoginForm }
