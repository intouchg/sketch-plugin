import React, { useState } from 'react'
import { Box, Stack, Flex, Heading } from '@i/components'
import { AccentText, WelcomeButton, RecentProjects, HelpfulResources, NewProjectModal } from '../components'
import { sketchRequest } from '../sketchApi'
import pkg from '../../package.json'

const selectLocalProject = () => sketchRequest('selectLocalProject')

const Welcome = () => {
	const [ showNewProjectModal, setShowNewProjectModal ] = useState(false)

	return (
		<>
			<Flex
				height="100vh"
				alignItems="center"
				justifyContent="center"
			>
				<Box
					minHeight="360px"
					width="552px"
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
							<WelcomeButton
								marginBottom={4}
								onClick={() => setShowNewProjectModal(true)}
							>
								New
							</WelcomeButton>
							<HelpfulResources />
						</Stack>
					</Flex>
				</Box>
			</Flex>
			{showNewProjectModal && (
				<NewProjectModal closeNewProjectModal={() => setShowNewProjectModal(false)} />
			)}
		</>
	)
}

export { Welcome }
