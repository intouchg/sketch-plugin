import React from 'react'
import { Box, Flex, Button, Heading } from '@i/components'

const ErrorBanner = ({
	message,
	resetError,
}: {
	message: string
	resetError: () => void
}) => (
	<Box
		padding={4}
		backgroundColor="red"
	>
		<Flex
			alignItems="center"
			justifyContent="space-evenly"
		>
			<Heading color="white">
				Error - {message}
			</Heading>
			<Button
				padding={2}
				borderRadius="small"
				boxShadow="small"
				color="white"
				backgroundColor="red"
				hoverColor="red"
				hoverBackgroundColor="white"
				border="2px solid"
				borderColor="white"
				onClick={resetError}
			>
				Dismiss
			</Button>
		</Flex>
	</Box>
)

export { ErrorBanner }
