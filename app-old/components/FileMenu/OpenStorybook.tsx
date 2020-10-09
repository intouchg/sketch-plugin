import React from 'react'
import { Box, Button } from '@i/components'
import { sketchRequest } from '../../sketchApi'

const openStorybook = () => sketchRequest('openStorybook')

const OpenStorybook = () => (
	<Box padding={4}>
		<Button
			padding={2}
			color="white"
			backgroundColor="blue"
			activeColor="white"
			onClick={openStorybook}
		>
			Open Storybook
		</Button>
	</Box>
)

export { OpenStorybook }
