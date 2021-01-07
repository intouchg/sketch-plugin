import React from 'react'
import { Text } from '@i/components'

const AzureStatusLabel = ({
	online,
	connected,
}: {
	online: boolean
	connected: boolean
}) => (
	<Text
		backgroundColor={!online ? 'Caution' : connected ? 'Positive' : 'Critical'}
		color={!online ? 'Caution Dark' : connected ? 'Positive Dark' : 'Critical Dark'}
		fontWeight="Demibold"
		fontSize={1}
		paddingX="4px"
		paddingY="2px"
		borderRadius="Medium"
		textTransform="uppercase"
	>
		{!online ? 'Interrupted' : connected ? 'Connected' : 'Disconnected'}
	</Text>
)

export { AzureStatusLabel }
