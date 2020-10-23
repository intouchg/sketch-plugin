import React from 'react'
import { Box } from '@i/components'
import { InvisibleButton } from '../Buttons'
import { AccentText } from '../Texts'

const AzureStatus = () => {
	const connected = true

	return (
		<InvisibleButton
			paddingY={3}
			marginRight={4}
		>
			<AccentText color="Text">
				Azure
				<Box
					display="inline-block"
					width="8px"
					height="8px"
					backgroundColor={connected ? 'Positive' : 'Negative'}
					borderRadius="50%"
					marginLeft={1}
				/>
			</AccentText>
		</InvisibleButton>
	)
}

export { AzureStatus }
