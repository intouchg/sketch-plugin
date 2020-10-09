import React from 'react'
import { Box, Stack, Flex, Heading } from '@i/components'
import { AccentText, TertiaryButton, WelcomeButton } from '../../components'
import pkg from '../../../package.json'

const Welcome = () => {
	return (
		<Flex
			height="100vh"
			alignItems="center"
			justifyContent="center"
		>
			<Box
				width={552}
				height={364}
			>
				<Stack
					paddingX={1}
					marginBottom={4}
				>
					<Heading
						variant="Secondary"
						marginBottom={1}
					>
						IDS Editor
					</Heading>
					<AccentText>
						{pkg.version}
					</AccentText>
				</Stack>
				<Flex justifyContent="center">
					<Stack>
						<WelcomeButton marginBottom={4}>
							Open
						</WelcomeButton>
						<Stack paddingX={1}>
							<AccentText marginBottom={2}>
								Recent
							</AccentText>
							<Stack alignItems="flex-start">
								<TertiaryButton marginBottom={1}>
									IDS Plugin
								</TertiaryButton>
								<TertiaryButton marginBottom={1}>
									Exec Demo
								</TertiaryButton>
								<TertiaryButton marginBottom={1}>
									More...
								</TertiaryButton>
							</Stack>
						</Stack>
					</Stack>
					<WelcomeButton marginX="1.125em">
						Download
					</WelcomeButton>
					<Stack>
						<WelcomeButton marginBottom={4}>
							New
						</WelcomeButton>
						<Stack paddingX={1}>
							<AccentText marginBottom={2}>
								Resources
							</AccentText>
							<Stack alignItems="flex-start">
								<TertiaryButton marginBottom={1}>
									Getting Started
								</TertiaryButton>
								<TertiaryButton marginBottom={1}>
									Coming Soon
								</TertiaryButton>
								<TertiaryButton marginBottom={1}>
									Support
								</TertiaryButton>
							</Stack>
						</Stack>
					</Stack>
				</Flex>
			</Box>
		</Flex>
	)
}

export { Welcome }
