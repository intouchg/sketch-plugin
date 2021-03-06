import React, { useState, useEffect } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import { Flex, Text, Stack, Input, Heading } from '@intouchg/components'
import { ModalBackground } from '../ModalBackground'
import { LeftToolbar } from './LeftToolbar'
import { RepoList } from './RepoList'
import { DownloadRepo } from './DownloadRepo'
import { CloseModalButton } from '../CloseModalButton'
import { Loading } from '../Loading'
import { sendSketchCommand } from '../../sketchApi'
import { useDisplayErrorBanner } from '../../hooks'
import { setShowReposModal } from '../../store'
import type { AzureUserConnection, AzureGitRepo } from '@intouchg/azure'

const OFFLINE_ERROR_MESSAGE = 'Restore internet connectivity to browse Azure projects.'

const ReposModal = () => {
	const dispatch = useDispatch()
	const showReposModal = useSelector((state) => state.azure.showReposModal)
	const online = useSelector((state) => state.azure.online)
	const [ repos, setRepos ] = useState<AzureUserConnection['gitRepos']>([])
	const [ showLoading, setShowLoading ] = useState(true)
	const [ filterText, setFilterText ] = useState('')
	const [ selectedRepo, setSelectedRepo ] = useState<AzureGitRepo | null>(null)
	const [ selectedOrganization, setSelectedOrganization ] = useState('')
	const displayErrorBanner = useDisplayErrorBanner()

	useEffect(() => {
		if (!showReposModal || !online) {
			return
		}

		let isMounted = true

		sendSketchCommand('getAzureGitRepos', {})
			.then((reposData) => batch(() => {
				if (isMounted) {
					setRepos(reposData)
					setShowLoading(false)
				}
			}))
			.catch((error) => displayErrorBanner(error))

		return () => void (isMounted = false)
	}, [ showReposModal, online, displayErrorBanner ])

	if (!showReposModal) {
		return null
	}

	const resetSelectedRepo = () => {
		setFilterText('')
		setSelectedOrganization('')
		setSelectedRepo(null)
	}

	const closeModal = () => {
		resetSelectedRepo()
		dispatch(setShowReposModal(false))
	}

	const selectedRepoData = selectedOrganization ? [ repos.find((repoData) => repoData[0] === selectedOrganization)! ] : repos
	let filteredRepoData: AzureUserConnection['gitRepos'] = selectedRepoData

	if (filterText !== '') {
		const lowercaseFilterText = filterText.toLowerCase()
		filteredRepoData = []
		const dataLength = selectedRepoData.length

		for (let i = 0; i < dataLength; i++) {
			const filteredRepos = selectedRepoData[i][1].filter((repo) => repo.name.toLowerCase().includes(lowercaseFilterText))

			if (filteredRepos.length) {
				filteredRepoData.push([ selectedRepoData[i][0], filteredRepos ])
			}
		}
	}

	return (
		<ModalBackground>
			<Stack
				width="calc(100vw - 308px)"
				minWidth="800px"
				height="calc(100vh - 100px)"
				minHeight="500px"
				backgroundColor="Card"
				boxShadow="Downward Accent"
				borderRadius={3}
				overflow="hidden"
			>
				<Flex
					width="100%"
					height="48px"
					alignItems="center"
					justifyContent="space-between"
					flexShrink={0}
					boxShadow="Inset X Accent"
				>
					<Heading paddingX={3}>
						Download project
					</Heading>
					<CloseModalButton
						position="relative"
						width="16px"
						padding={2}
						marginRight={2}
						onClick={closeModal}
					/>
				</Flex>
				<Flex flexGrow={1}>
					{!online && (
						<Text
							display="flex"
							alignItems="center"
							justifyContent="center"
							flexGrow={1}
						>
							{OFFLINE_ERROR_MESSAGE}
						</Text>
					)}
					{online && showLoading && (
						<Stack
							alignItems="center"
							justifyContent="center"
							flexGrow={1}
						>
							<Text marginBottom={4}>
								Loading projects ...
							</Text>
							<Loading />
						</Stack>
					)}
					{online && !showLoading && !selectedRepo && (
						<>
							<LeftToolbar
								repos={repos}
								selectedOrganization={selectedOrganization}
								setSelectedOrganization={setSelectedOrganization}
							/>
							<Stack flexGrow={1}>
								<Flex
									flexShrink={0}
									justifyContent="center"
									paddingX={6}
									paddingY={3}
									backgroundColor="Background"
								>
									<Input
										width="100%"
										maxWidth="560px"
										style={{ transform: 'scale3d(1, 1, 1)' }}
										autoCorrect="off"
										autoCapitalize="off"
										autoComplete="off"
										spellCheck="false"
										placeholder="Search..."
										value={filterText}
										onChange={(event) => setFilterText(event.target.value)}
									/>
								</Flex>
								<RepoList
									repos={filteredRepoData}
									setSelectedRepo={setSelectedRepo}
								/>
							</Stack>
						</>
					)}
					{online && !showLoading && selectedRepo && (
						<DownloadRepo
							repo={selectedRepo}
							resetSelectedRepo={resetSelectedRepo}
						/>
					)}
				</Flex>
			</Stack>
		</ModalBackground>
	)
}

export { ReposModal }
