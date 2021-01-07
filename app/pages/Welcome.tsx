import React, { useState } from 'react'
import { Box, Stack, Flex, Heading } from '@i/components'
import { TopToolbar, AccentText, WelcomeButton, RecentProjects, HelpfulResources, NewProjectModal, ReposModal, topToolbarHeight } from '../components'
import { useSelectLocalProject } from '../hooks'
import pkg from '../../package.json'

const Welcome = ({
	setShowAzureModal,
	setShowSettingsModal,
}: {
	setShowAzureModal: React.Dispatch<React.SetStateAction<boolean>>
	setShowSettingsModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const selectLocalProject = useSelectLocalProject()
	const [ showReposModal, setShowReposModal ] = useState(false)
	const [ showNewProjectModal, setShowNewProjectModal ] = useState(false)

	return (
		<>
			<TopToolbar
				setShowAzureModal={setShowAzureModal}
				setShowSettingsModal={setShowSettingsModal}
			/>
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
								<WelcomeButton
									marginX="1.125em"
									onClick={() => setShowReposModal(true)}
								>
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
			{showReposModal && (
				<ReposModal setShowReposModal={setShowReposModal} />
			)}
			{showNewProjectModal && (
				<NewProjectModal setShowNewProjectModal={setShowNewProjectModal} />
			)}
		</>
	)
}

export { Welcome }
