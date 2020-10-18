import React from 'react'
import styled from 'styled-components'
import { Flex } from '@i/components'

import { topToolbarHeight } from './TopToolbar'

const NewProjectModal = ({
	closeNewProjectModal,
}: {
    closeNewProjectModal: () => void
}) => (
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
			width="calc(100vw - 720px)"
			minWidth="560px"
			height="calc(100vh - 356px)"
			backgroundColor="Card"
			boxShadow="Medium"
			borderRadius="Large"
		>
			Test
		</Flex>
	</Flex>
)

export { NewProjectModal }
