import React from 'react'
import { useSelector } from 'react-redux'
import { Stack, Text } from '@i/components'
import { Loading } from './Loading'

const LoadingScreen = () => {
	const { message, show } = useSelector((state) => state.loading)

	if (!show) {
		return null
	}

	return (
		<Stack
			alignItems="center"
			justifyContent="center"
			position="fixed"
			top="0"
			bottom="0"
			left="0"
			right="0"
			backgroundColor="Card"
			zIndex={4}
		>
			<Text marginBottom={4}>
				{message}
			</Text>
			<Loading />
		</Stack>
	)
}

export { LoadingScreen }
