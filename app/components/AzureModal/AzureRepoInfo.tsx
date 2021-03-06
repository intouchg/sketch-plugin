import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Stack, Box, Heading, Flex, Text, Button } from '@intouchg/components'
import { Icon } from '../Icon'
import { LimitInteraction } from '../LimitInteraction'
import { useDownloadUpdates, useSaveChanges, useRevertChanges } from '../../hooks'
import { timeSince } from '@intouchg/utility'

const TruncatedProjectName = styled(Heading).attrs({ variant: 'Tertiary' })`
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`

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
				borderRadius={3}
			>
				<Text fontSize={3}>
					No project selected.
				</Text>
			</Stack>
		)
	}

	return (
		<Flex
			padding={4}
			backgroundColor="Card"
			borderRadius={3}
		>
			<Stack
				width="402px"
				justifyContent="center"
			>
				<TruncatedProjectName marginBottom={3}>
					{localProject.split('/').pop()}
				</TruncatedProjectName>
				<Flex marginBottom={2}>
					<Text
						variant="Modal Accent"
						fontSize={3}
					>
						Branch:&nbsp;
					</Text>
					<Text
						variant="Modal Accent"
						fontSize={3}
						fontWeight={5}
						color="Text"
					>
						{branchName}
					</Text>
				</Flex>
				<Flex alignItems="center">
					<Text
						variant="Modal Accent"
						fontSize={3}
					>
						Last saved:&nbsp;
					</Text>
					<Text
						variant="Modal Accent"
						fontSize={3}
						fontWeight={5}
						color="Text"
					>
						{lastPushTime ? `${timeSince(lastPushTime)} ago` : 'Never'}&nbsp;&nbsp;
					</Text>
					{hasLocalChanges && (
						<Button
							invisible
							onClick={promptToRevert}
						>
							<Text
								variant="Modal Accent"
								fontSize={3}
								textDecoration="underline"
							>
								Revert
							</Text>
						</Button>
					)}
				</Flex>
			</Stack>
			<Stack flexGrow={1}>
				<LimitInteraction
					as={Button}
					unlimit={online && connected && hasRemoteChanges}
					marginBottom={3}
					onClick={downloadUpdates}
				>
					Download Latest
				</LimitInteraction>
				<LimitInteraction
					as={Button}
					unlimit={online && connected && hasLocalChanges}
					display="flex"
					alignItems="center"
					justifyContent="center"
					onClick={saveChanges}
				>
					Save to Azure&nbsp;
					<Box marginLeft={1}>
						<Icon
							icon="CloudUpIcon"
							fill="Card"
							width="24px"
						/>
					</Box>
				</LimitInteraction>
			</Stack>
		</Flex>
	)
}

export { AzureRepoInfo }
