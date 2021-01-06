import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, batch } from 'react-redux'
import { Flex, Stack, Input, Text } from '@i/components'
import { PrimaryButton, SecondaryButton, TertiaryButton } from '../Buttons'
import { AccentText } from '../Texts'
import { LimitInteraction } from '../LimitInteraction'
import { sendSketchCommand, openBrowserWindow } from '../../sketchApi'
import { setAzureCredentials } from '../../store'

const AzureLoginInput = styled(Input).attrs((props) => ({
	autoCorrect: 'off',
	autoCapitalize: 'off',
	autoComplete: 'off',
	spellCheck: 'off',
}))<{ error: boolean }>`
	padding: ${(props) => props.theme.space[3]};
	border: 1px solid ${(props) => props.error ? props.theme.colors.Critical : 'transparent'};
	border-radius: ${(props) => props.theme.radii.Large};
	text-transform: lowercase;
	transform: scale3d(1, 1, 1);
`

const AzureLoginForm = ({
	online,
	username,
	setShowLoginForm,
}: {
	online: boolean
	username: string
	setShowLoginForm: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const dispatch = useDispatch()
	const [ usernameValue, setUsernameValue ] = useState(username)
	const [ accessTokenValue, setAccessTokenValue ] = useState('')
	const [ error, setError ] = useState('')

	const loginToAzure = () => {
		setError('')

		sendSketchCommand('loginToAzure', {
			username: usernameValue,
			accessToken: accessTokenValue,
		})
			.then((credentials) => batch(() => {
				dispatch(setAzureCredentials(credentials))
				setShowLoginForm(false)
			}))
			.catch((error) => setError(error.includes('401') ? 'Authentication failed. Please check your username and access token and try again.' : error))
	}

	return (
		<>
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
					onClick={() => openBrowserWindow('https://google.com')}
				>
					Follow the Azure setup user guide.
				</TertiaryButton>
			</Flex>
			{error && (
				<Flex
					width="100%"
					marginBottom={2}
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
				<SecondaryButton onClick={() => setShowLoginForm(false)}>
					Back
				</SecondaryButton>
				<LimitInteraction
					as={PrimaryButton}
					unlimit={online && Boolean(usernameValue && accessTokenValue)}
					onClick={loginToAzure}
				>
					Log In
				</LimitInteraction>
			</Flex>
		</>
	)
}

export { AzureLoginForm }
