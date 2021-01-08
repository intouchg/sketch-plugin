import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Stack, Box, Heading, Flex, Text } from '@i/components'
import { PrimaryButton, SecondaryButton } from '../Buttons'
import { ModalText } from '../Texts'
import { CloudIcon } from '../Icons'
import { LimitInteraction } from '../LimitInteraction'
import { useSelectLocalProject, useDisplayErrorBanner } from '../../hooks'
import { sendSketchCommand } from '../../sketchApi'
import { setThemeData } from '../../store'

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
	const canUndo = useSelector((state) => state.theme.canUndo)
	const selectLocalProject = useSelectLocalProject()
	const displayErrorBanner = useDisplayErrorBanner()

	const revertChanges = () => {
		sendSketchCommand('resetLocalChanges', {})
			.then((themeData) => dispatch(setThemeData(themeData)))
			.catch((error) => displayErrorBanner(error))
	}

	if (!localProject) {
		return (
			<Stack
				alignItems="center"
				paddingX={4}
				paddingY={6}
				backgroundColor="Card"
				borderRadius="Large"
			>
				<Text
					fontSize={3}
					marginBottom={3}
				>
					No project selected.
				</Text>
				<PrimaryButton onClick={selectLocalProject}>
					Select a Project
				</PrimaryButton>
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
				unlimit={online && connected && canUndo}
				display="flex"
				width="100%"
			>
				<Flex
					as={PrimaryButton}
					alignItems="center"
					justifyContent="center"
					flexGrow={1}
					marginRight={3}
				>
					Save to Azure
					<Box marginLeft={1}>
						<CloudIcon
							fill="Card"
							width="24px"
						/>
					</Box>
				</Flex>
				<SecondaryButton onClick={revertChanges}>
					Revert
				</SecondaryButton>
			</LimitInteraction>
		</Box>
	)
}

export { AzureRepoInfo }
