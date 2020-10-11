import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from '@i/components'
import { RightToolbar } from './RightToolbar'

const ResponsiveContainer = styled(Box)`
    flex-grow: 1;
    overflow-y: scroll;
`

const ImportModal = ({
	closeImportModal,
}: {
	closeImportModal: () => void
}) => {
	return (
		<Flex
			position="fixed"
			top="0"
			width="100vw"
			height="100vh"
			alignItems="center"
			justifyContent="center"
			backgroundColor="rgba(0, 0, 0, 0.3)"
			zIndex={4}
		>
			<Flex
				width="calc(100vw - 308px)"
				height="calc(100vh - 100px)"
				backgroundColor="Card"
				boxShadow="Medium"
				borderRadius="Large"
			>
				<ResponsiveContainer>
					Content goes here
				</ResponsiveContainer>
				<RightToolbar closeImportModal={closeImportModal} />
			</Flex>
		</Flex>
	)
}

export { ImportModal }
