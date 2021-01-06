import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Stack, Input, Text } from '@i/components'
import { PrimaryButton, TertiaryButton } from '../Buttons'
import { AccentText } from '../Texts'
import { LimitInteraction } from '../LimitInteraction'
import { sendSketchCommand, openBrowserWindow } from '../../sketchApi'
import { setAzureCredentials } from '../../store'

const AzureLoginForm = ({
	username,
}: {
    username: string
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
			.then((credentials) => dispatch(setAzureCredentials(credentials)))
			.catch((error) => setError(error.includes('401') ? 'Authentication failed. Please check your username and access token and try again.' : error))
	}

	return (
		<>
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
					borderWidth="1px"
					borderStyle="solid"
					borderColor={error ? 'Critical' : 'transparent'}
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
					borderWidth="1px"
					borderStyle="solid"
					borderColor={error ? 'Critical' : 'transparent'}
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
			<Flex
				alignSelf="start"
				alignItems="center"
				width="100%"
			>
				<LimitInteraction
					as={PrimaryButton}
					flexShrink={0}
					marginRight={3}
					unlimit={Boolean(usernameValue && accessTokenValue)}
					onClick={loginToAzure}
				>
					Log In
				</LimitInteraction>
				{error && (
					<Text color="Critical">
						{error}
					</Text>
				)}
			</Flex>
		</>
	)
}

export { AzureLoginForm }
