import React from 'react'
import styled from 'styled-components'
import { Stack, Box, Button } from '@i/components'
import { AccentText } from '../index'

const CloseIcon = styled.div``

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
				<Button
					as={CloseIcon}
					position="absolute"
					top="0"
					right="0"
					padding={2}
					zIndex={4}
					onClick={closeImportModal}
				>
					X
				</Button>
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
