import React from 'react'
import { Flex, Heading, Box } from '@i/components'
import { ImportButton } from './ImportButton'
import { PreviewButton } from './PreviewButton'
import { AzureStatus } from './AzureStatus'

export const topToolbarHeight = '64px'

const TopToolbar = ({
	setShowImportModal,
	setShowAzureModal,
}: {
	setShowImportModal: React.Dispatch<React.SetStateAction<boolean>>
	setShowAzureModal: React.Dispatch<React.SetStateAction<boolean>>
}) => (
	<Flex
		height={topToolbarHeight}
		alignItems="center"
		justifyContent="space-between"
		backgroundColor="Card"
		paddingX={3}
		boxShadow="Medium"
		zIndex={3}
	>
		<Heading>
			IDS Plugin
		</Heading>
		<Box>
			<ImportButton setShowImportModal={setShowImportModal} />
			<PreviewButton />
			<AzureStatus setShowAzureModal={setShowAzureModal} />
		</Box>
	</Flex>
)

export { TopToolbar }
