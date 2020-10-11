import React from 'react'
import { Stack, Box } from '@i/components'
import { AccentText, InvisibleButton, CloseIcon, PrimaryButton } from '../index'

const RightToolbar = ({
	closeImportModal,
}: {
	closeImportModal: () => void
}) => {
	return (
		<Box
			width="280px"
			backgroundColor="Background"
			borderTopRightRadius="Large"
			borderBottomRightRadius="Large"
		>
			<Stack
				position="relative"
				height="100%"
			>
				<InvisibleButton
					position="absolute"
					top="0"
					right="0"
					padding={2}
					zIndex={4}
					onClick={closeImportModal}
				>
					<CloseIcon
						width="13px"
						fill="Accent"
					/>
				</InvisibleButton>
				<AccentText
					color="Primary"
					paddingTop={4}
					paddingLeft={3}
				>
					Select All
				</AccentText>
				<PrimaryButton
					position="absolute"
					bottom="0"
					width="calc(100% - 40px)"
					margin="20px"
				>
					Import
				</PrimaryButton>
			</Stack>
		</Box>
	)
}

export { RightToolbar }
