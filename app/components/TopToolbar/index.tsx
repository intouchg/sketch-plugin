import React from 'react'
import { useSelector } from 'react-redux'
import { Flex, Heading, Box } from '@i/components'
import { ImportButton } from './ImportButton'
import { PreviewButton } from './PreviewButton'
import { AzureStatus } from './AzureStatus'
import { MoreMenu } from './MoreMenu'
import { UpdatesStatus } from './UpdatesStatus'

export const topToolbarHeight = '64px'

const TopToolbar = ({
	showProjectOptions,
	setShowImportModal,
}: {
	showProjectOptions?: boolean
	setShowImportModal?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const localProject = useSelector((state) => state.azure.localProject)

	return (
		<Flex
			height={topToolbarHeight}
			alignItems="center"
			justifyContent="space-between"
			backgroundColor={setShowImportModal ? 'Card' : 'none'}
			paddingX={3}
			boxShadow={setShowImportModal ? 'Medium' : 'none'}
			zIndex={3}
		>
			<Flex alignItems="center">
				<UpdatesStatus />
				<Heading>
					{localProject ? localProject.split('/').pop() : ''}
				</Heading>
			</Flex>
			<Box>
				{setShowImportModal && (
					<>
						<ImportButton setShowImportModal={setShowImportModal} />
						<PreviewButton />
					</>
				)}
				<AzureStatus />
				<MoreMenu showProjectOptions={showProjectOptions} />
			</Box>
		</Flex>
	)
}

export { TopToolbar }
