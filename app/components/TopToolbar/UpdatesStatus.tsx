import React from 'react'
import { useSelector } from 'react-redux'
import { Text, Box } from '@i/components'
import { Loading } from '../Loading'

const UpdatesStatus = () => {
	const hasRemoteChanges = useSelector((state) => state.azure.hasRemoteChanges)
	const checkingHasRemoteChanges = useSelector((state) => state.azure.checkingHasRemoteChanges)

	if (checkingHasRemoteChanges) {
		return (
			<Box marginRight={3}>
				<Loading
					width="20px"
					height="20px"
					borderWidth="3px"
				/>
			</Box>
		)
	}

	if (hasRemoteChanges) {
		return (
			<Box
				width="20px"
				height="20px"
				borderWidth="2px"
				borderStyle="solid"
				borderColor="Primary Light"
				borderRadius="50%"
				textAlign="center"
				marginRight={3}
			>
				<Text
					color="Primary Light"
					fontWeight="900"
					fontSize="16px"
					lineHeight="16px"
					paddingTop="2px"
				>
					&darr;
				</Text>
			</Box>
		)
	}

	return null
}

export { UpdatesStatus }
