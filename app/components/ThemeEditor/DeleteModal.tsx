import React from 'react'
import { Stack, Flex, Heading } from '@i/components'
import { ModalBackground } from '../ModalBackground'

const DeleteModal = () => {
	return (
		<ModalBackground>
			<Stack
				width="calc(100vw - 308px)"
				minWidth="800px"
				height="calc(100vh - 100px)"
				minHeight="500px"
				backgroundColor="Card"
				boxShadow="Downward Accent"
				borderRadius={3}
				overflow="hidden"
			>
				<Flex
					width="100%"
					height="48px"
					alignItems="center"
					justifyContent="space-between"
					flexShrink={0}
					boxShadow="Inset X Accent"
				>
					<Heading paddingX={3}>
						Delete confirmation
					</Heading>
					<CloseModalButton
						position="relative"
						width="16px"
						padding={2}
						marginRight={2}
						onClick={closeModal}
					/>
				</Flex>
			</Stack>
		</ModalBackground>
	)
}

export { DeleteModal }
