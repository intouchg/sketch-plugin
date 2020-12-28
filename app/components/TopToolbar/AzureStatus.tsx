import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@i/components'
import { InvisibleButton } from '../Buttons'
import { AccentText } from '../Texts'

const AzureStatus = ({
	openAzureStatusModal,
	openAzureLoginModal,
}: {
	openAzureStatusModal: () => void
	openAzureLoginModal: () => void
}) => {
	const { username, accessToken } = useSelector((state) => state.azure.credentials)
	const connected = Boolean(username && accessToken)

	const openModal = () => connected ? openAzureStatusModal() : openAzureLoginModal()

	return (
		<InvisibleButton
			paddingY={3}
			marginRight={4}
			onClick={openModal}
		>
			<AccentText color="Text">
				Azure
				<Box
					display="inline-block"
					width="8px"
					height="8px"
					backgroundColor={connected ? 'Positive' : 'Critical'}
					borderRadius="50%"
					marginLeft={1}
				/>
			</AccentText>
		</InvisibleButton>
	)
}

export { AzureStatus }
