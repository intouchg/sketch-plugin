import React from 'react'
import { Flex, Stack, Heading } from '@i/components'
import { ModalBackground } from './ModalBackground'
import { CloseModalButton } from './CloseModalButton'

const SettingsModal = ({
	setShowSettingsModal,
}: {
    setShowSettingsModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	return (
		<ModalBackground>
			<Flex
				width="560px"
				padding={5}
				backgroundColor="Background"
				boxShadow="Medium"
				borderRadius="Large"
			>
				<CloseModalButton onClick={() => setShowSettingsModal(false)} />
				<Stack
					flexGrow={1}
					overflow="hidden"
				>
					<Heading marginRight={2}>
						Settings
					</Heading>
				</Stack>
			</Flex>
		</ModalBackground>
	)
}

export { SettingsModal }
