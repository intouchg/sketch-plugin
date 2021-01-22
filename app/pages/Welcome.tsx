import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Stack, Flex, Heading, Button } from '@i/components'
import { TopToolbar, AccentText, RecentProjects, HelpfulResources, NewProjectModal, ReposModal, topToolbarHeight } from '../components'
import { useSelectLocalProject } from '../hooks'
import { setShowReposModal, setAzureModalState } from '../store'
import pkg from '../../package.json'

const Welcome = () => {
	const dispatch = useDispatch()
	const { username, accessToken } = useSelector((state) => state.azure.credentials)
	const connected = Boolean(username && accessToken)
	const [ showNewProjectModal, setShowNewProjectModal ] = useState(false)
	const selectLocalProject = useSelectLocalProject()

	return (
		<>
			<TopToolbar />
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
								<Button
									variant="Welcome"
									marginBottom={4}
									onClick={selectLocalProject}
								>
									Open
								</Button>
								<Button
									variant="Welcome"
									marginX="1.125em"
									onClick={() => dispatch(connected ? setShowReposModal(true) : setAzureModalState('redirectToRepos'))}
								>
									Download
								</Button>
							</Flex>
							<RecentProjects />
						</Stack>
						<Stack>
							<Button
								variant="Welcome"
								marginBottom={4}
								onClick={() => setShowNewProjectModal(true)}
							>
								New
							</Button>
							<HelpfulResources />
						</Stack>
					</Flex>
				</Box>
			</Flex>
			<ReposModal />
			{showNewProjectModal && (
				<NewProjectModal setShowNewProjectModal={setShowNewProjectModal} />
			)}
		</>
	)
}

export { Welcome }
