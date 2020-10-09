import React from 'react'
import { Box, Stack, Flex, Heading } from '@i/components'
import { AccentText, WelcomeButton, RecentProjects, HelpfulResources } from '../components'
import pkg from '../../package.json'

const Welcome = () => {
	return (
		<Flex
			height="100vh"
			alignItems="center"
			justifyContent="center"
		>
			<Box width={552}>
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
						<RecentProjects />
					</Stack>
					<WelcomeButton marginX="1.125em">
						Download
					</WelcomeButton>
					<Stack>
						<WelcomeButton marginBottom={4}>
							New
						</WelcomeButton>
						<HelpfulResources />
					</Stack>
				</Flex>
			</Box>
		</Flex>
	)
}

export { Welcome }
