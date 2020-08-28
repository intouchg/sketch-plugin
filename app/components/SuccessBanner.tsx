import React from 'react'
import { Box, Flex, Button, Heading } from '@i/components'

const SuccessBanner = ({
	message,
	resetSuccess,
}: {
	message: string
	resetSuccess: () => void
}) => (
	<Box
		padding={4}
		backgroundColor="green"
	>
		<Flex>
			<Heading color="white">
				Success - {message}
			</Heading>
			<Button
				padding={2}
				borderRadius="small"
				boxShadow="small"
				color="white"
				backgroundColor="green"
				hoverColor="green"
				hoverBackgroundColor="white"
				border="2px solid"
				borderColor="white"
				onClick={resetSuccess}
			>
				Dismiss
			</Button>
		</Flex>
	</Box>
)

export { SuccessBanner }
