import React from 'react'
import { useSelector } from 'react-redux'
import { Text, Box, Button } from '@i/components'
import { Loading } from '../Loading'

const UpdatesStatus = () => {
	const hasRemoteChanges = useSelector((state) => state.azure.hasRemoteChanges)
	const checkingHasRemoteChanges = useSelector((state) => state.azure.checkingHasRemoteChanges)

	if (checkingHasRemoteChanges) {
		return (
			<Box>
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
			<Button />
		)
	}

	return null
}

export { UpdatesStatus }
