import React from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { Stack, Box, Heading, Flex, Text } from '@i/components'
import { PrimaryButton, SecondaryButton } from '../Buttons'
import { ModalText } from '../Texts'
import { CloudIcon } from '../Icons'
import { LimitInteraction } from '../LimitInteraction'
import { useDisplayErrorBanner } from '../../hooks'
import { sendSketchCommand } from '../../sketchApi'
import { setThemeData, setLoadingState, setBannerState, setHasLocalChanges } from '../../store'

const AzureRepoInfo = ({
	online,
	connected,
}: {
	online: boolean
	connected: boolean
}) => {
	const dispatch = useDispatch()
	const localProject = useSelector((state) => state.azure.localProject)
	const branchName = useSelector((state) => state.azure.branchName)
	const lastPush = useSelector((state) => state.azure.lastPush)
	const hasLocalChanges = useSelector((state) => state.azure.hasLocalChanges)
	const displayErrorBanner = useDisplayErrorBanner()

	const saveChanges = async () => {
		try {
			const hasRemoteUpdates = await sendSketchCommand('checkForRemoteUpdates', {})

			if (hasRemoteUpdates) {
				dispatch(setLoadingState({ show: true, message: 'Downloading updates ...' }))
				await sendSketchCommand('downloadRemoteUpdates', {})
			}

			dispatch(setLoadingState({ show: true, message: 'Saving changes ...' }))
			await sendSketchCommand('saveChangesToAzure', {})

			batch(() => {
				dispatch(setLoadingState({ show: false, message: '' }))
				dispatch(setBannerState({ show: true, type: 'success', message: hasRemoteUpdates ? 'Downloaded updates and saved changes to Azure.' : 'Saved changes to Azure.' }))
			})
		}
		catch (error) {
			displayErrorBanner(error)
		}
	}

	const revertChanges = () => sendSketchCommand('resetLocalChanges', {})
		.then((themeData) => {
			dispatch(setHasLocalChanges(false))
			dispatch(setThemeData({ ...themeData, skipResetChangeHistory: true }))
		})
		.catch((error) => displayErrorBanner(error))

	const promptToRevert = () => dispatch(setBannerState({
		show: true,
		type: 'warn',
		message: 'Are you sure you want to revert all unsaved changes?',
		confirmText: 'Revert',
		cancelText: 'Cancel',
		onConfirm: revertChanges,
	}))

	if (!localProject) {
		return (
			<Stack
				alignItems="center"
				paddingX={4}
				paddingY={6}
				backgroundColor="Card"
				borderRadius="Large"
			>
				<Text fontSize={3}>
					No project selected.
				</Text>
			</Stack>
		)
	}

	return (
		<Box
			padding={4}
			backgroundColor="Card"
			borderRadius="Large"
		>
			<Heading
				variant="Tertiary"
				marginBottom={2}
			>
				{localProject.split('/').pop()}
			</Heading>
			<Flex marginBottom={3}>
				<Flex>
					<ModalText>
						Branch:&nbsp;
					</ModalText>
					<ModalText
						color="Text"
						fontWeight="Bold"
					>
						{branchName}
					</ModalText>
				</Flex>
				<ModalText>
					&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
				</ModalText>
				<Flex>
					<ModalText>
						Last saved:&nbsp;
					</ModalText>
					<ModalText
						color="Text"
						fontWeight="Bold"
					>
						14 minutes ago
					</ModalText>
				</Flex>
			</Flex>
			<LimitInteraction
				unlimit={online && connected && hasLocalChanges}
				display="flex"
				width="100%"
			>
				<Flex
					as={PrimaryButton}
					alignItems="center"
					justifyContent="center"
					flexGrow={1}
					marginRight={3}
					onClick={saveChanges}
				>
					Save to Azure
					<Box marginLeft={1}>
						<CloudIcon
							fill="Card"
							width="24px"
						/>
					</Box>
				</Flex>
				<SecondaryButton onClick={promptToRevert}>
					Revert
				</SecondaryButton>
			</LimitInteraction>
		</Box>
	)
}

export { AzureRepoInfo }
