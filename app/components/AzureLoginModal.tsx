import React from 'react'
import { Flex } from '@i/components'
import { ModalBackground } from './ModalBackground'

const AzureLoginModal = ({
	closeAzureLoginModal,
}: {
	closeAzureLoginModal: () => void
}) => {
	return (
		<ModalBackground>
			<Flex>
				Test
			</Flex>
		</ModalBackground>
	)
}

export { AzureLoginModal }
