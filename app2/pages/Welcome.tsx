import React from 'react'
import { Box, Stack, Flex, Heading, Input } from '@i/components'
import { AccentText, TertiaryButton, DirectoryInput } from '../components'
import pkg from '../../package.json'

const Welcome = () => {
	return (
		<Flex
			height="100vh"
			alignItems="center"
			justifyContent="center"
		>
			<Box
				width={640}
				height={480}
			>
				<Stack
					paddingX={2}
					marginBottom={6}
				>
					<Heading
						variant="secondary"
						marginBottom={1}
					>
						IDS Editor
					</Heading>
					<AccentText>
						{pkg.version}
					</AccentText>
				</Stack>
				<Stack marginBottom={5}>
					<AccentText
						paddingX={1}
						marginBottom={2}
					>
						Open Project
					</AccentText>
					<DirectoryInput />
				</Stack>
				<Flex
					justifyContent="space-between"
					paddingX={2}
				>
					<Stack>
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
					<Stack>
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
				</Flex>
			</Box>
		</Flex>
	)
}

export { Welcome }
