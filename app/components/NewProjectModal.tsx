import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Stack, Heading, Box } from '@i/components'
import { ModalBackground } from './ModalBackground'
import { InvisibleButton, PrimaryButton } from './Buttons'
import { FolderIcon } from './Icons'
import { AccentText, TruncatedText } from './Texts'
import { CloseModalButton } from './CloseModalButton'
import { LimitInteraction } from './LimitInteraction'
import { DirectoryInput } from './DirectoryInput'
import { sendSketchCommand } from '../sketchApi'
import { useDisplayErrorBanner } from '../hooks'

const NewProjectModal = ({
	setShowNewProjectModal,
}: {
    setShowNewProjectModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const dispatch = useDispatch()
	const [ directory, setDirectory ] = useState('')
	const [ template, setTemplate ] = useState()
	const displayErrorBanner = useDisplayErrorBanner()

	const selectDirectory = () => sendSketchCommand('selectDirectory', {})
		.then((filepath) => setDirectory(filepath))
		.catch((error) => displayErrorBanner(error))

	return (
		<ModalBackground>
			<Flex
				width="560px"
				height="364px"
				padding={5}
				backgroundColor="Background"
				boxShadow="Medium"
				borderRadius="Large"
			>
				<CloseModalButton onClick={() => setShowNewProjectModal(false)} />
				<Stack flexGrow={1}>
					<Heading marginBottom={4}>
						New Project
					</Heading>
					<Stack marginBottom={3}>
						<AccentText marginBottom={2}>
							Folder *
						</AccentText>
						<DirectoryInput
							value={directory}
							onClick={selectDirectory}
						/>
					</Stack>
					<Stack marginBottom={4}>
						<AccentText marginBottom={2}>
							Template *
						</AccentText>
						<Box
							height="75px"
							backgroundColor="Card"
							borderRadius="Large"
						/>
					</Stack>
					<Flex alignSelf="start">
						<LimitInteraction
							as={PrimaryButton}
							unlimit={Boolean(directory && template)}
						>
							Create
						</LimitInteraction>
					</Flex>
				</Stack>
			</Flex>
		</ModalBackground>
	)
}

export { NewProjectModal }
