import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector, batch } from 'react-redux'
import { Flex, Stack, Heading, Box, Text, Input, Button } from '@i/components'
import { ModalBackground } from './ModalBackground'
import { CloseModalButton } from './CloseModalButton'
import { DirectoryInput } from './DirectoryInput'
import { sendSketchCommand } from '../sketchApi'
import { useDisplayErrorBanner } from '../hooks'

const ProjectNameInput = styled(Input).attrs<
	typeof Input
>((props) => ({
	autoCorrect: 'off',
	autoCapitalize: 'off',
	autoComplete: 'off',
	spellCheck: 'false',
}))<{
	error: boolean
}>`
	border: 1px solid ${(props) => props.error ? props.theme.colors.Critical : 'transparent'};
	transform: scale3d(1, 1, 1);
`

const MISSING_PROJECT_NAME_ERROR = 'Input a project name before creating a new project.'
const PROJECT_NAME_COLON_ERROR = 'Project name may not contain a colon ":" character.'
const MISSING_SAVE_LOCATION_ERROR = 'Select a save location before creating a new project.'
const MISSING_PROJECT_TEMPLATE_ERROR = 'Select a project template before creating a new project.'

const NewProjectModal = ({
	setShowNewProjectModal,
}: {
    setShowNewProjectModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const dispatch = useDispatch()
	const defaultSaveDirectory = useSelector((state) => state.settings.defaultSaveDirectory)
	const [ projectName, setProjectName ] = useState('')
	const [ directory, setDirectory ] = useState(defaultSaveDirectory || '')
	const [ template, setTemplate ] = useState()
	const [ error, setError ] = useState('')
	const displayErrorBanner = useDisplayErrorBanner()

	const updateProjectName = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (error === MISSING_PROJECT_NAME_ERROR) {
			setError('')
		}

		const { value } = event.target

		if (value.includes(':')) {
			setError(PROJECT_NAME_COLON_ERROR)
		}
		else if (error === PROJECT_NAME_COLON_ERROR) {
			setError('')
		}

		setProjectName(event.target.value)
	}

	const selectDirectory = () => sendSketchCommand('selectDirectory', {})
		.then((filepath) => batch(() => {
			if (filepath) {
				if (error === MISSING_SAVE_LOCATION_ERROR) {
					setError('')
				}

				setDirectory(filepath)
			}
		}))
		.catch((error) => displayErrorBanner(error))

	const selectTemplate = () => {
		if (error === MISSING_PROJECT_TEMPLATE_ERROR) {
			setError('')
		}
	}

	const createProject = () => {
		if (!projectName) {
			return setError(MISSING_PROJECT_NAME_ERROR)
		}

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
						<Text
							variant="Accent"
							marginBottom={2}
						>
							Project Name *
						</Text>
						<ProjectNameInput
							error={error === MISSING_PROJECT_NAME_ERROR || error === PROJECT_NAME_COLON_ERROR}
							value={projectName}
							onChange={updateProjectName}
						/>
						{(error === MISSING_PROJECT_NAME_ERROR || error === PROJECT_NAME_COLON_ERROR) && (
							<Text
								paddingY={2}
								color="Critical"
							>
								{error}
							</Text>
						)}
					</Stack>
					<Stack marginBottom={3}>
						<Text
							variant="Accent"
							marginBottom={2}
						>
							Save Location *
						</Text>
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
						<Text
							variant="Accent"
							marginBottom={2}
						>
							Project Template *
						</Text>
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
						<Button onClick={createProject}>
							Create
						</Button>
					</Flex>
				</Stack>
			</Flex>
		</ModalBackground>
	)
}

export { NewProjectModal }
