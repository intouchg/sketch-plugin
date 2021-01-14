import React, { useState } from 'react'
import { useDispatch, batch } from 'react-redux'
import { Flex, Stack, Heading, Box, Text } from '@i/components'
import { ModalBackground } from './ModalBackground'
import { PrimaryButton } from './Buttons'
import { AccentText } from './Texts'
import { CloseModalButton } from './CloseModalButton'
import { DirectoryInput } from './DirectoryInput'
import { sendSketchCommand } from '../sketchApi'
import { useDisplayErrorBanner } from '../hooks'

const MISSING_SAVE_LOCATION_ERROR = 'You must select a save location before creating a new project.'
const MISSING_PROJECT_TEMPLATE_ERROR = 'You must select a project template before creating a new project.'

const NewProjectModal = ({
	setShowNewProjectModal,
}: {
    setShowNewProjectModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const dispatch = useDispatch()
	const [ directory, setDirectory ] = useState('')
	const [ template, setTemplate ] = useState()
	const [ error, setError ] = useState('')
	const displayErrorBanner = useDisplayErrorBanner()

	const selectDirectory = () => sendSketchCommand('selectDirectory', {})
		.then((filepath) => batch(() => {
			if (error === MISSING_SAVE_LOCATION_ERROR) {
				setError('')
			}

			setDirectory(filepath)
		}))
		.catch((error) => displayErrorBanner(error))

	const selectTemplate = () => {
		if (error === MISSING_PROJECT_TEMPLATE_ERROR) {
			setError('')
		}
	}

	const createProject = () => {
		if (!directory) {
			return setError(MISSING_SAVE_LOCATION_ERROR)
		}

		if (!template) {
			return setError(MISSING_PROJECT_TEMPLATE_ERROR)
		}
	}

	return (
		<ModalBackground>
			<Flex
				width="560px"
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
							Save Location *
						</AccentText>
						<DirectoryInput
							borderWidth="1px"
							borderStyle="solid"
							borderColor={error === MISSING_SAVE_LOCATION_ERROR ? 'Critical' : 'transparent'}
							value={directory}
							onClick={selectDirectory}
						/>
						{error === MISSING_SAVE_LOCATION_ERROR && (
							<Text
								paddingY={2}
								color="Critical"
							>
								{error}
							</Text>
						)}
					</Stack>
					<Stack marginBottom={4}>
						<AccentText marginBottom={2}>
							Project Template *
						</AccentText>
						<Box
							height="75px"
							backgroundColor="Card"
							borderWidth="1px"
							borderStyle="solid"
							borderColor={error === MISSING_PROJECT_TEMPLATE_ERROR ? 'Critical' : 'transparent'}
							borderRadius="Large"
						/>
						{error === MISSING_PROJECT_TEMPLATE_ERROR && (
							<Text
								paddingY={2}
								color="Critical"
							>
								{error}
							</Text>
						)}
					</Stack>
					<Flex alignSelf="start">
						<PrimaryButton onClick={createProject}>
							Create
						</PrimaryButton>
					</Flex>
				</Stack>
			</Flex>
		</ModalBackground>
	)
}

export { NewProjectModal }
