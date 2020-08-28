import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Flex, Text, Stack, Button } from '@i/components'
import { setDeletingValue, deleteThemeValue } from '../store'

const DeletingModal = () => {
	const dispatch = useDispatch()
	const { id, message } = useSelector((state) => state.theme.deletingValue)

	if (!id) {
		return null
	}

	const cancelDeleting = () => dispatch(setDeletingValue({ id: '' }))
	const deleteValue = () => dispatch(deleteThemeValue({ id }))

	return (
		<Stack
			position="fixed"
			top={0}
			bottom={0}
			left={0}
			right={0}
			backgroundColor="black"
			zIndex={100}
		>
			<Box
				padding={4}
				borderRadius="medium"
				backgroundColor="white"
			>
				<Text padding={3}>
					{message}
				</Text>
				<Flex>
					<Button
						padding={2}
						onClick={cancelDeleting}
					>
						Cancel
					</Button>
					<Button
						padding={2}
						color="white"
						backgroundColor="red"
						activeColor="white"
						onClick={deleteValue}
					>
						Delete
					</Button>
				</Flex>
			</Box>
		</Stack>
	)
}

export { DeletingModal }
