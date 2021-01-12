import React, { useState, useEffect } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import { Flex, Text, Stack } from '@i/components'
import { ModalBackground } from '../ModalBackground'
import { LeftToolbar } from './LeftToolbar'
import { ReposList } from './ReposList'
import { sendSketchCommand } from '../../sketchApi'
import { useDisplayErrorBanner } from '../../hooks'
import { setShowReposModal } from '../../store'
import { CloseModalButton } from '../CloseModalButton'
import { Loading } from '../Loading'
import type { AzureGitRepos } from '../../sketchApi'

const OFFLINE_ERROR_MESSAGE = 'Please restore internet connectivity to browse Azure projects.'

const ReposModal = () => {
	const dispatch = useDispatch()
	const showReposModal = useSelector((state) => state.azure.showReposModal)
	const online = useSelector((state) => state.azure.online)
	const [ repos, setRepos ] = useState<AzureGitRepos>({})
	const [ showLoading, setShowLoading ] = useState(true)
	const displayErrorBanner = useDisplayErrorBanner()

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
						<LeftToolbar repos={repos} />
						<Flex
							alignItems="center"
							justifyContent="center"
							flexGrow={1}
							padding={6}
							overflowY="scroll"
						>
							<ReposList repos={repos} />
						</Flex>
					</>
				)}
			</Flex>
		</ModalBackground>
	)
}

export { ReposModal }
