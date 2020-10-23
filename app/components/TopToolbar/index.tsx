import React from 'react'
import { Flex, Heading, Box } from '@i/components'
import { ImportButton } from './ImportButton'
import { PreviewButton } from './PreviewButton'
import { AzureStatus } from './AzureStatus'

export const topToolbarHeight = '64px'

const TopToolbar = ({
	openImportModal,
}: {
	openImportModal: () => void
}) => {
	return (
		<Flex
			height={topToolbarHeight}
			alignItems="center"
			justifyContent="space-between"
			backgroundColor="Card"
			paddingX={3}
			boxShadow="Medium"
			zIndex={4}
		>
			<Heading>
				IDS Plugin
			</Heading>
			<Box>
				<ImportButton openImportModal={openImportModal} />
				<PreviewButton />
				<AzureStatus />
			</Box>
		</Flex>
	)
}

export { TopToolbar }
