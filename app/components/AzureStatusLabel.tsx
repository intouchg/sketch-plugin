import React from 'react'
import { Text } from '@i/components'

const AzureStatusLabel = ({
	connected,
}: {
    connected: boolean
}) => (
	<Text
		backgroundColor={connected ? 'Positive' : 'Critical'}
		color="Card"
		fontWeight="Bold"
		fontSize={1}
		paddingX="4px"
		paddingY="2px"
		borderRadius="Medium"
		textTransform="uppercase"
	>
		{connected ? 'Connected' : 'Disconnected'}
	</Text>
)

export { AzureStatusLabel }
