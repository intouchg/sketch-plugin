import React from 'react'
import { Flex, Heading } from '@i/components'
import { AzureStatus } from './index'

const TopToolbar = () => {
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
			<AzureStatus />
		</Flex>
	)
}

export { TopToolbar }
