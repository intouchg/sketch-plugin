import React, { useState, useEffect } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import { Flex, Text, Stack } from '@i/components'
import { ModalBackground } from '../ModalBackground'
import { LeftToolbar } from './LeftToolbar'
import { ReposList } from './ReposList'
import { BottomToolbar } from './BottomToolbar'
import { CloseModalButton } from '../CloseModalButton'
import { Loading } from '../Loading'
import { sendSketchCommand } from '../../sketchApi'
import { useDisplayErrorBanner } from '../../hooks'
import { setShowReposModal } from '../../store'
import type { AzureGitRepos } from '../../sketchApi'
import type { AzureGitRepo } from '@i/azure'

const OFFLINE_ERROR_MESSAGE = 'Please restore internet connectivity to browse Azure projects.'

const ReposModal = () => {
	const dispatch = useDispatch()
	const showReposModal = useSelector((state) => state.azure.showReposModal)
	const online = useSelector((state) => state.azure.online)
	const [ repos, setRepos ] = useState<AzureGitRepos>({})
	const [ showLoading, setShowLoading ] = useState(true)
	const [ filterText, setFilterText ] = useState('')
	const [ selectedOrganization, setSelectedOrganization ] = useState('')
	const [ selectedRepoId, setSelectedRepoId ] = useState<string>('')
	const displayErrorBanner = useDisplayErrorBanner()

	const selectedRepos = selectedOrganization ? { [selectedOrganization]: repos[selectedOrganization] } : repos
	const selectedRepo = Object.values(repos).flat().find((repo) => repo.id === selectedRepoId)

	useEffect(() => {
		if (!showReposModal) {
			return
		}

		let isMounted = true

		sendSketchCommand('getAzureGitRepos', {})
			.then((azureRepos) => batch(() => {
				if (isMounted) {
					setRepos(azureRepos)
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
				{online && !showLoading && (
					<>
						<LeftToolbar
							repos={repos}
							selectedOrganization={selectedOrganization}
							setSelectedOrganization={setSelectedOrganization}
						/>
						<Stack flexGrow={1}>
							<ReposList
								repos={selectedRepos}
								selectedRepoId={selectedRepoId}
								setSelectedRepoId={setSelectedRepoId}
							/>
							<BottomToolbar selectedRepo={selectedRepo} />
						</Stack>
					</>
				)}
			</Flex>
		</ModalBackground>
	)
}

export { ReposModal }
