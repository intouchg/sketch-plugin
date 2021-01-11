import React from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { Stack, Box, Heading, Flex, Text } from '@i/components'
import { PrimaryButton, SecondaryButton } from '../Buttons'
import { ModalText } from '../Texts'
import { CloudIcon } from '../Icons'
import { LimitInteraction } from '../LimitInteraction'
import { useDisplayErrorBanner } from '../../hooks'
import { sendSketchCommand } from '../../sketchApi'
import { setThemeData, setLoadingState, setBannerState, setHasLocalChanges, setHasRemoteChanges, setLastPushTime } from '../../store'

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
	const lastPushTime = useSelector((state) => state.azure.lastPushTime)
	const hasLocalChanges = useSelector((state) => state.azure.hasLocalChanges)
	const hasRemoteChanges = useSelector((state) => state.azure.hasRemoteChanges)
	const displayErrorBanner = useDisplayErrorBanner()

	const downloadUpdates = async () => {
		try {
			dispatch(setLoadingState({ show: true, message: 'Downloading updates ...' }))
			const { themeData, didReceiveChanges } = await sendSketchCommand('downloadRemoteChanges', {})

			batch(() => {
				dispatch(setLoadingState({ show: false }))
				dispatch(setHasRemoteChanges(false))
				console.log('update theme data = ', themeData)
				dispatch(setThemeData(themeData))

				if (didReceiveChanges) {
					dispatch(setBannerState({ show: true, type: 'success', message: 'Downloaded updates from Azure.' }))
				}
				else {
					dispatch(setBannerState({ show: true, type: 'info', message: 'Your project is already up to date.' }))
				}
			})
		}
		catch (error) {
			console.log('update error = ', error)
			displayErrorBanner(error)
		}
	}

	const saveChanges = async () => {
		try {
			if (hasRemoteChanges) {
				return dispatch(setBannerState({ show: true, type: 'info', message: 'You must download updates before saving.' }))
			}

			dispatch(setLoadingState({ show: true, message: 'Saving changes ...' }))
			const lastPushTimeString = await sendSketchCommand('saveChangesToAzure', {})

			batch(() => {
				dispatch(setHasLocalChanges(false))
				dispatch(setLastPushTime(new Date(lastPushTimeString)))
				dispatch(setLoadingState({ show: false }))
				dispatch(setBannerState({ show: true, type: 'success', message: 'Saved changes to Azure.' }))
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
						{lastPushTime ? lastPushTime.toLocaleString() : 'Never'}
					</ModalText>
				</Flex>
			</Flex>
			<Flex>
				<LimitInteraction
					as={PrimaryButton}
					unlimit={online && connected && hasLocalChanges}
					display="flex"
					alignItems="center"
					justifyContent="center"
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
				</LimitInteraction>
				<LimitInteraction
					as={PrimaryButton}
					unlimit={hasRemoteChanges}
					marginRight={3}
					onClick={downloadUpdates}
				>
					Update
				</LimitInteraction>
				<LimitInteraction
					as={SecondaryButton}
					unlimit={online && connected && hasLocalChanges}
					onClick={promptToRevert}
				>
					Revert
				</LimitInteraction>
			</Flex>
		</Box>
	)
}

export { AzureRepoInfo }
