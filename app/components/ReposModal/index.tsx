import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Box } from '@i/components'
import { ModalBackground } from '../ModalBackground'
import { AzureLoginForm } from '../AzureLoginForm'
import { LeftToolbar } from './LeftToolbar'
import { ReposList } from './ReposList'
import { sendSketchCommand } from '../../sketchApi'
import { useDisplayErrorBanner } from '../../hooks'
import { CloseModalButton } from '../CloseModalButton'

// TO DO: Loading component

const ReposModal = ({
	setShowReposModal,
}: {
	setShowReposModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const dispatch = useDispatch()
	const online = useSelector((state) => state.azure.online)
	const { username, accessToken } = useSelector((state) => state.azure.credentials)
	const connected = Boolean(username && accessToken)
	const [ showLoginForm, setShowLoginForm ] = useState(!connected)
	const [ showLoading, setShowLoading ] = useState(false)

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
				<CloseModalButton onClick={() => setShowReposModal(false)} />
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
								<>
									LOADING
								</>
							) : (
								<ReposList />
							)}
						</Flex>
					</>
				)}
				{showLoginForm && (
					<AzureLoginForm
						online={online}
						username={username}
						setShowLoginForm={setShowLoginForm}
					/>
				)}
			</Flex>
		</ModalBackground>
	)
}

export { ReposModal }
