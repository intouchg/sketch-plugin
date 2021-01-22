import React from 'react'
import { useSelector } from 'react-redux'
import { Stack, Box, Heading, Flex, Text, Button } from '@i/components'
import { CloudIcon } from '../Icons'
import { LimitInteraction } from '../LimitInteraction'
import { useDownloadUpdates, useSaveChanges, useRevertChanges } from '../../hooks'
import { timeSince } from '@i/utility'

const AzureRepoInfo = ({
	online,
	connected,
}: {
	online: boolean
	connected: boolean
}) => {
	const localProject = useSelector((state) => state.azure.localProject)
	const branchName = useSelector((state) => state.azure.branchName)
	const lastPushTime = useSelector((state) => state.azure.lastPushTime)
	const hasLocalChanges = useSelector((state) => state.azure.hasLocalChanges)
	const hasRemoteChanges = useSelector((state) => state.azure.hasRemoteChanges)
	const downloadUpdates = useDownloadUpdates()
	const saveChanges = useSaveChanges()
	const promptToRevert = useRevertChanges()

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
					<Text variant="Modal Accent">
						Branch:&nbsp;
					</Text>
					<Text
						variant="Modal Accent"
						color="Text"
						fontWeight="Bold"
					>
						{branchName}
					</Text>
				</Flex>
				<Text variant="Modal Accent">
					&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
				</Text>
				<Flex>
					<Text variant="Modal Accent">
						Last saved:&nbsp;
					</Text>
					<Text
						variant="Modal Accent"
						color="Text"
						fontWeight="Bold"
					>
						{lastPushTime ? `${timeSince(lastPushTime)} ago` : 'Never'}
					</Text>
				</Flex>
			</Flex>
			<Flex>
				<LimitInteraction
					as={Button}
					unlimit={online && connected && hasLocalChanges}
					display="flex"
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
				</LimitInteraction>
				<LimitInteraction
					as={Button}
					unlimit={online && connected && hasRemoteChanges}
					onClick={downloadUpdates}
				>
					Download Updates
				</LimitInteraction>
			</Flex>
			<Flex alignItems="flex-end">
				<LimitInteraction
					unlimit={online && connected && hasLocalChanges}
					marginTop={3}
				>
					<Button
						variant="Secondary"
						onClick={promptToRevert}
					>
						Revert to Last Save
					</Button>
				</LimitInteraction>
			</Flex>
		</Box>
	)
}

export { AzureRepoInfo }
