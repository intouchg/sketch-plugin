import React from 'react'
import { useSelector } from 'react-redux'
import { Flex, Heading, Box } from '@i/components'
import { ImportButton } from './ImportButton'
import { PreviewButton } from './PreviewButton'
import { AzureStatus } from './AzureStatus'

export const topToolbarHeight = '64px'

const TopToolbar = ({
	setShowImportModal,
	setShowAzureModal,
}: {
	setShowImportModal?: React.Dispatch<React.SetStateAction<boolean>>
	setShowAzureModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const localProject = useSelector((state) => state.azure.localProject)

	return (
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
				{localProject ? localProject.split('/').pop() : 'IDS Plugin'}
			</Heading>
			<Box>
				{setShowImportModal && (
					<>
						<ImportButton setShowImportModal={setShowImportModal} />
						<PreviewButton />
					</>
				)}
				<AzureStatus setShowAzureModal={setShowAzureModal} />
			</Box>
		</Flex>
	)
}

export { TopToolbar }
