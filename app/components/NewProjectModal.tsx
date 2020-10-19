import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Flex, Stack, Heading, Box, Text } from '@i/components'
import { InvisibleButton, PrimaryButton } from './Buttons'
import { CloseIcon, FolderIcon } from './Icons'
import { AccentText, TruncatedText } from './Texts'
import { sketchRequest } from '../sketchApi'

const selectNewProjectDirectory = () => sketchRequest('selectNewProjectDirectory')

const CreateButton = styled(PrimaryButton)<{ enabled: boolean }>`
	${(props) => props.enabled ? `
		pointer-events: unset;
	` : `
		pointer-events: none;
		opacity: 0.5;
	`}
`

const NewProjectModal = ({
	closeNewProjectModal,
}: {
    closeNewProjectModal: () => void
}) => {
	const [ directory, setDirectory ] = useState('')
	const [ template, setTemplate ] = useState()

	useEffect(() => {
		window.setNewProjectDirectory = (directory) => setDirectory(directory)
		return () => void delete window.setNewProjectDirectory
	}, [ directory, setDirectory ])

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
				width="560px"
				height="364px"
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
					zIndex={4}
					onClick={closeNewProjectModal}
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
					<Heading marginBottom={4}>
						New Project
					</Heading>
					<Stack marginBottom={3}>
						<AccentText marginBottom={2}>
							Folder
						</AccentText>
						<InvisibleButton
							position="relative"
							onClick={selectNewProjectDirectory}
						>
							<Flex
								alignItems="center"
								height="48px"
								paddingX={3}
								backgroundColor="Card"
								borderRadius="Large"
							>
								<TruncatedText maxWidth="90%">
									{directory}
								</TruncatedText>
							</Flex>
							<Box
								position="absolute"
								top="0"
								right="0"
								margin="14px"
								marginTop="13px"
							>
								<FolderIcon
									fill="Accent"
									width="20px"
									height="21px"
								/>
							</Box>
						</InvisibleButton>
					</Stack>
					<Stack marginBottom={4}>
						<AccentText marginBottom={2}>
							Template
						</AccentText>
						<Box
							height="75px"
							backgroundColor="Card"
							borderRadius="Large"
						/>
					</Stack>
					<Flex alignSelf="start">
						<CreateButton enabled={Boolean(directory && template)}>
							Create
						</CreateButton>
					</Flex>
				</Stack>
			</Flex>
		</Flex>
	)
}

export { NewProjectModal }
