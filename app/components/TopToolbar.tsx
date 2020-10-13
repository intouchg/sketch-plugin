import React from 'react'
import { Flex, Heading, Box } from '@i/components'
import { InvisibleButton, AccentText, SketchIcon, AzureStatus } from './index'

const TopToolbar = ({
	openImportModal,
}: {
	openImportModal: () => void
}) => {
	return (
		<Flex
			height="64px"
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
				<InvisibleButton
					display="inline-flex"
					marginRight={4}
					onClick={openImportModal}
				>
					<AccentText
						color="Text"
						marginRight={1}
					>
						Import
					</AccentText>
					<SketchIcon
						width="16px"
						height="16px"
					/>
				</InvisibleButton>
				<AzureStatus />
			</Box>
		</Flex>
	)
}

export { TopToolbar }
