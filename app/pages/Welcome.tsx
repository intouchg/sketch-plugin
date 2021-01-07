import React, { useState } from 'react'
import { Box, Stack, Flex, Heading } from '@i/components'
import { TopToolbar, AccentText, WelcomeButton, RecentProjects, HelpfulResources, NewProjectModal, topToolbarHeight } from '../components'
import { useSelectLocalProject } from '../hooks'
import pkg from '../../package.json'

const Welcome = ({
	setShowAzureModal,
}: {
	setShowAzureModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const selectLocalProject = useSelectLocalProject()
	const [ showNewProjectModal, setShowNewProjectModal ] = useState(false)

	return (
		<>
			<TopToolbar setShowAzureModal={setShowAzureModal} />
			<Flex
				height={`calc(100vh - ${topToolbarHeight})`}
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
							IDS Plugin
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
				<NewProjectModal setShowNewProjectModal={setShowNewProjectModal} />
			)}
		</>
	)
}

export { Welcome }
