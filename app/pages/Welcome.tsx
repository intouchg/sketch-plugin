import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Stack, Flex, Heading } from '@i/components'
import { TopToolbar, AccentText, WelcomeButton, RecentProjects, HelpfulResources, NewProjectModal, ReposModal, topToolbarHeight } from '../components'
import { useSelectLocalProject } from '../hooks'
import { setShowReposModal, setAzureModalState } from '../store'
import pkg from '../../package.json'

const Welcome = () => {
	const dispatch = useDispatch()
	const showReposModal = useSelector((state) => state.azure.showReposModal)
	const { username, accessToken } = useSelector((state) => state.azure.credentials)
	const connected = Boolean(username && accessToken)
	const [ showLoadingUpdates, setShowLoadingUpdates ] = useState(false)
	const [ showNewProjectModal, setShowNewProjectModal ] = useState(false)
	const selectLocalProject = useSelectLocalProject(setShowLoadingUpdates)

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
								<WelcomeButton
									marginBottom={4}
									onClick={selectLocalProject}
								>
									Open
								</WelcomeButton>
								<WelcomeButton
									marginX="1.125em"
									onClick={() => dispatch(connected ? setShowReposModal(true) : setAzureModalState('redirectToRepos'))}
								>
									Download
								</WelcomeButton>
							</Flex>
							<RecentProjects setShowLoadingUpdates={setShowLoadingUpdates} />
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
				<ReposModal />
			)}
			{showNewProjectModal && (
				<NewProjectModal setShowNewProjectModal={setShowNewProjectModal} />
			)}
			{showLoadingUpdates && (
				<Box
					position="fixed"
					top="0"
					left="0"
					bottom="0"
					right="0"
					backgroundColor="Primary"
					zIndex={5}
				>
					Pulling updates...
				</Box>
			)}
		</>
	)
}

export { Welcome }
