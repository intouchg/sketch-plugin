import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Heading, Flex } from '@i/components'
import { PrimaryButton, SecondaryButton } from '../Buttons'
import { ModalText } from '../Texts'

const AzureRepoInfo = () => {
	const localProject = useSelector((state) => state.azure.localProject)
	const branchName = useSelector((state) => state.azure.branchName)
	const lastPush = useSelector((state) => state.azure.lastPush)

	return (
		<Box
			padding={4}
			backgroundColor="Card"
			borderRadius="Large"
		>
			<Heading
				variant="Tertiary"
				color="Primary"
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
			<Flex>
				<Box
					as={PrimaryButton}
					flexGrow={1}
					marginRight={3}
				>
					Save to Azure
				</Box>
				<SecondaryButton>
					Revert
				</SecondaryButton>
			</Flex>
		</Box>
	)
}

export { AzureRepoInfo }
