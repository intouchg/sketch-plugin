import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@i/components'
import { InvisibleButton } from '../Buttons'
import { AccentText } from '../Texts'

const AzureStatus = ({
	setShowAzureModal,
}: {
	setShowAzureModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const online = useSelector((state) => state.azure.online)
	const { username, accessToken } = useSelector((state) => state.azure.credentials)
	const connected = Boolean(username && accessToken)

	return (
		<InvisibleButton
			paddingY={3}
			marginRight={4}
			onClick={() => setShowAzureModal(true)}
		>
			<AccentText color="Text">
				Azure
				<Box
					display="inline-block"
					width="8px"
					height="8px"
					backgroundColor={!online ? 'Caution' : connected ? 'Positive' : 'Critical'}
					borderRadius="50%"
					marginLeft={1}
				/>
			</AccentText>
		</InvisibleButton>
	)
}

export { AzureStatus }
