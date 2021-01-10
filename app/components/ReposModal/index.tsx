import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Stack, Heading, Text } from '@i/components'
import { ModalBackground } from '../ModalBackground'
import { LeftToolbar } from './LeftToolbar'
import { ReposList } from './ReposList'
import { sendSketchCommand } from '../../sketchApi'
import { useDisplayErrorBanner } from '../../hooks'
import { setShowReposModal } from '../../store'
import { CloseModalButton } from '../CloseModalButton'
import { Loading } from '../Loading'

const OFFLINE_ERROR_MESSAGE = 'Please restore internet connectivity to browse Azure projects.'

const ReposModal = () => {
	const dispatch = useDispatch()
	const showReposModal = useSelector((state) => state.azure.showReposModal)
	const online = useSelector((state) => state.azure.online)
	const { username, accessToken } = useSelector((state) => state.azure.credentials)
	const connected = Boolean(username && accessToken)
	const [ showLoading, setShowLoading ] = useState(false)

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
				{connected && (
					<>
						<LeftToolbar />
						<Flex
							alignItems="center"
							justifyContent="center"
							flexGrow={1}
							padding={6}
							overflowY="scroll"
						>
							{showLoading ? (
								<Loading />
							) : (
								<ReposList />
							)}
						</Flex>
					</>
				)}
			</Flex>
		</ModalBackground>
	)
}

export { ReposModal }
