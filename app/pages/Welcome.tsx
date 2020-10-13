import React from 'react'
import { Box, Stack, Flex, Heading } from '@i/components'
import { AccentText, WelcomeButton, RecentProjects, HelpfulResources } from '../components'
import { sketchRequest } from '../sketchApi'
import pkg from '../../package.json'

const selectLocalProject = () => sketchRequest('selectLocalProject')

const Welcome = () => (
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
				<AccentText textTransform="unset">
					v&thinsp;{pkg.version}
				</AccentText>
			</Stack>
			<Flex justifyContent="center">
				<Stack>
					<Flex>
						<WelcomeButton
							marginBottom={4}
							onClick={selectLocalProject}
						>
							Open
						</WelcomeButton>
						<WelcomeButton marginX="1.125em">
							Download
						</WelcomeButton>
					</Flex>
					<RecentProjects />
				</Stack>
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

export { Welcome }
