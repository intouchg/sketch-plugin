import React from 'react'
import { Flex, Stack } from '@i/components'
import { ModalBackground } from './ModalBackground'
import { InvisibleButton } from './Buttons'
import { CloseIcon } from './Icons'

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
				<InvisibleButton
					position="absolute"
					top="0"
					right="0"
					padding={2}
					zIndex={3}
					onClick={() => setShowSettingsModal(false)}
				>
					<CloseIcon
						width="13px"
						fill="Accent"
					/>
				</InvisibleButton>
				<Stack
					flexGrow={1}
					overflow="hidden"
				>
					Settings
				</Stack>
			</Flex>
		</ModalBackground>
	)
}

export { SettingsModal }
