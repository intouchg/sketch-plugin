import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, InvisibleButton, Text } from '@i/components'
import { setAzureModalState } from '../../store'

const AzureStatus = () => {
	const dispatch = useDispatch()
	const online = useSelector((state) => state.azure.online)
	const { username, accessToken } = useSelector((state) => state.azure.credentials)
	const connected = Boolean(username && accessToken)

	return (
		<InvisibleButton
			paddingY={3}
			marginRight={3}
			onClick={() => dispatch(setAzureModalState('standard'))}
		>
			<Text
				variant="Accent"
				color="Text"
			>
				Azure
				<Box
					display="inline-block"
					width="8px"
					height="8px"
					backgroundColor={!online ? 'Caution' : connected ? 'Positive' : 'Critical'}
					borderRadius="50%"
					marginLeft={1}
				/>
			</Text>
		</InvisibleButton>
	)
}

export { AzureStatus }
