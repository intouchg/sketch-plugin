import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Stack, Heading } from '@i/components'
import { ModalBackground } from './ModalBackground'
import { CloseModalButton } from './CloseModalButton'
import { setShowSettingsModal } from '../store'

const SettingsModal = () => {
	const dispatch = useDispatch()
	const showSettingsModal = useSelector((state) => state.settings.showSettingsModal)

	if (!showSettingsModal) {
		return null
	}

	return (
		<ModalBackground>
			<Flex
				width="560px"
				padding={5}
				backgroundColor="Background"
				boxShadow="Medium"
				borderRadius="Large"
			>
				<CloseModalButton onClick={() => dispatch(setShowSettingsModal(false))} />
				<Stack flexGrow={1}>
					<Heading marginRight={2}>
						Settings
					</Heading>
				</Stack>
			</Flex>
		</ModalBackground>
	)
}

export { SettingsModal }
