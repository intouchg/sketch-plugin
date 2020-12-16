import React from 'react'
import { Flex } from '@i/components'
import { ModalBackground } from './ModalBackground'

const AzureStatusModal = ({
	closeAzureStatusModal,
}: {
	closeAzureStatusModal: () => void
}) => {
	return (
		<ModalBackground>
			<Flex>
				Test
			</Flex>
		</ModalBackground>
	)
}

export { AzureStatusModal }
