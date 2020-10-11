import React from 'react'
import { Stack, Box } from '@i/components'
import { AccentText, InvisibleButton, CloseIcon } from '../index'

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
			<Stack position="relative">
				<InvisibleButton
					position="absolute"
					top="0"
					right="0"
					padding={2}
					zIndex={4}
					onClick={closeImportModal}
				>
					<CloseIcon
						width="64px"
					/>
				</InvisibleButton>
				<AccentText
					color="Primary"
					paddingTop={4}
					paddingLeft={3}
				>
					Select All
				</AccentText>
			</Stack>
		</Box>
	)
}

export { RightToolbar }
