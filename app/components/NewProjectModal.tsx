import React from 'react'
import styled from 'styled-components'
import { Flex, Stack, Heading, Box } from '@i/components'
import { InvisibleButton, PrimaryButton } from './Buttons'
import { CloseIcon } from './Icons'
import { AccentText } from './Texts'

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
			minHeight="360px"
			padding={5}
			backgroundColor="Card"
			boxShadow="Medium"
			borderRadius="Large"
		>
			<InvisibleButton
				position="absolute"
				top="0"
				right="0"
				padding={2}
				zIndex={4}
				onClick={closeNewProjectModal}
			>
				<CloseIcon
					width="13px"
					fill="Accent"
				/>
			</InvisibleButton>
			<Stack>
				<Heading marginBottom={4}>
					New Project
				</Heading>
				<Stack marginBottom={3}>
					<AccentText>
						Folder
					</AccentText>
					<Box
						width="100%"
						height="48px"
						backgroundColor="Card"
					/>
				</Stack>
				<Stack marginBottom={4}>
					<AccentText>
						Template
					</AccentText>
					<Box
						width="100%"
						height="75px"
						backgroundColor="Card"
					/>
				</Stack>
				<PrimaryButton>
					Create
				</PrimaryButton>
			</Stack>
		</Flex>
	</Flex>
)

export { NewProjectModal }
