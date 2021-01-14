import React, { useState, useEffect } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import { Flex, Text, Stack, Input } from '@i/components'
import { ModalBackground } from '../ModalBackground'
import { LeftToolbar } from './LeftToolbar'
import { ReposList } from './ReposList'
import { DownloadRepo } from './DownloadRepo'
import { CloseModalButton } from '../CloseModalButton'
import { Loading } from '../Loading'
import { sendSketchCommand } from '../../sketchApi'
import { useDisplayErrorBanner } from '../../hooks'
import { setShowReposModal } from '../../store'
import type { AzureUserConnection, AzureGitRepo } from '@i/azure'

const OFFLINE_ERROR_MESSAGE = 'Please restore internet connectivity to browse Azure projects.'

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

	useEffect(() => {
		if (!showReposModal) {
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
	}, [ showReposModal, displayErrorBanner ])

	if (!showReposModal) {
		return null
	}

	return (
		<ModalBackground>
			<Flex
				width="calc(100vw - 308px)"
				minWidth="800px"
				height="calc(100vh - 100px)"
				minHeight="460px"
				backgroundColor="Card"
				boxShadow="Medium"
				borderRadius="Large"
				overflow="hidden"
			>
				<CloseModalButton onClick={() => dispatch(setShowReposModal(false))} />
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
									padding={3}
									borderRadius="Large"
									placeholder="Search..."
									value={filterText}
									onChange={(event) => setFilterText(event.target.value)}
								/>
							</Flex>
							<ReposList
								repos={filteredRepoData}
								setSelectedRepo={setSelectedRepo}
							/>
						</Stack>
					</>
				)}
				{online && !showLoading && selectedRepo && (
					<DownloadRepo
						repo={selectedRepo}
						setSelectedRepo={setSelectedRepo}
						setSelectedOrganization={setSelectedOrganization}
						setFilterText={setFilterText}
					/>
				)}
			</Flex>
		</ModalBackground>
	)
}

export { ReposModal }
