import React, { useState } from 'react'
import { Box, Stack, Flex, Button, Input, Heading } from '@i/components'

const AzureLogin = ({
	onSubmit,
	onCancel,
}: {
    onSubmit: (credentials: { username: string, accessToken: string }) => void
    onCancel: () => void
}) => {
	const [ { username, accessToken }, setFormState ] = useState({
		username: '',
		accessToken: '',
	})

	const handleFormChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
		setFormState((state) => ({ ...state, [name]: value }))
	}

	const submitForm = () => onSubmit({ username, accessToken })

	return (
		<Stack
			position="fixed"
			top={0}
			bottom={0}
			left={0}
			right={0}
			backgroundColor="black"
			zIndex={100}
		>
			<Stack
				padding={4}
				borderRadius="medium"
				backgroundColor="white"
			>
				<Heading
					paddingTop={4}
					paddingBottom={1}
				>
					Login to Azure Devops
				</Heading>
				<Stack
					width={480}
					padding={4}
				>
					<Input
						width={3 / 4}
						padding={2}
						marginY={3}
						border="1px solid"
						borderColor="grey.3"
						borderRadius="small"
						type="username"
						name="username"
						value={username}
						placeholder="Username"
						onChange={handleFormChange}
					/>
					<Input
						width={3 / 4}
						padding={2}
						marginY={3}
						border="1px solid"
						borderColor="grey.3"
						borderRadius="small"
						type="password"
						name="accessToken"
						value={accessToken}
						placeholder="Access Token"
						onChange={handleFormChange}
					/>
				</Stack>
				<Flex>
					<Box
						display="inline-block"
						padding={4}
					>
						<Button
							paddingX={3}
							paddingY={2}
							color="red"
							activeColor="red"
							border="2px solid"
							borderColor="red"
							backgroundColor="transparent"
							onClick={onCancel}
						>
							Cancel
						</Button>
					</Box>
					<Box
						display="inline-block"
						padding={4}
					>
						<Button
							paddingX={3}
							paddingY={2}
							color="blue"
							activeColor="blue"
							border="2px solid"
							borderColor="blue"
							backgroundColor="transparent"
							onClick={submitForm}
						>
							Login
						</Button>
					</Box>
				</Flex>
			</Stack>
		</Stack>
	)
}

export { AzureLogin }
