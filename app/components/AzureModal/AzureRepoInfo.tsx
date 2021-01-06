import React from 'react'
import { useSelector } from 'react-redux'
import { Stack, Box, Heading, Flex, Text } from '@i/components'
import { PrimaryButton, SecondaryButton } from '../Buttons'
import { ModalText } from '../Texts'
import { CloudIcon } from '../Icons'
import { LimitInteraction } from '../LimitInteraction'
import { useSelectLocalProject } from '../../hooks'

const AzureRepoInfo = ({
	connected,
}: {
	connected: boolean
}) => {
	const localProject = useSelector((state) => state.azure.localProject)
	const branchName = useSelector((state) => state.azure.branchName)
	const lastPush = useSelector((state) => state.azure.lastPush)
	const selectLocalProject = useSelectLocalProject()

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
				unlimit={connected}
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
				<SecondaryButton>
					Revert
				</SecondaryButton>
			</LimitInteraction>
		</Box>
	)
}

export { AzureRepoInfo }
