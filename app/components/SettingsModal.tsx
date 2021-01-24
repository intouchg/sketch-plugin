import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Stack, Heading, Text } from '@i/components'
import { ModalBackground } from './ModalBackground'
import { CloseModalButton } from './CloseModalButton'
import { DirectoryInput } from './DirectoryInput'
import { Checkbox } from './Checkbox'
import { setShowSettingsModal, setDefaultSaveDirectory, setSkipImportSummary } from '../store'
import { sendSketchCommand } from '../sketchApi'
import { useDisplayErrorBanner } from '../hooks'

const SettingsModal = () => {
	const dispatch = useDispatch()
	const showSettingsModal = useSelector((state) => state.settings.showSettingsModal)
	const defaultSaveDirectory = useSelector((state) => state.settings.defaultSaveDirectory)
	const skipImportSummary = useSelector((state) => state.settings.skipImportSummary)
	const displayErrorBanner = useDisplayErrorBanner()

	if (!showSettingsModal) {
		return null
	}

	const updateDefaultSaveDirectory = (filepath: string) => {
		if (!filepath) {
			return
		}

		sendSketchCommand('updateLocalSettings', { defaultSaveDirectory: filepath })
			.then(() => dispatch(setDefaultSaveDirectory(filepath)))
			.catch((error) => displayErrorBanner(error))
	}

	const updateSkipImportSummary = () => {
		const skip = !skipImportSummary

		sendSketchCommand('updateLocalSettings', { skipImportSummary: skip })
			.then(() => dispatch(setSkipImportSummary(skip)))
			.catch((error) => displayErrorBanner(error))
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
				<CloseModalButton onClick={() => dispatch(setShowSettingsModal(false))} />
				<Stack flexGrow={1}>
					<Heading
						marginRight={2}
						marginBottom={4}
					>
						Settings
					</Heading>
					<Stack>
						<Stack marginBottom={5}>
							<Text
								variant="Accent"
								marginBottom={1}
							>
								Default Save Location
							</Text>
							<DirectoryInput
								value={defaultSaveDirectory}
								onChange={updateDefaultSaveDirectory}
							/>
						</Stack>
						<Flex alignItems="center">
							<Checkbox
								marginRight={2}
								checked={skipImportSummary}
								onClick={updateSkipImportSummary}
							/>
							<Text>
								Skip import summary
							</Text>
						</Flex>
					</Stack>
				</Stack>
			</Flex>
		</ModalBackground>
	)
}

export { SettingsModal }
