import React from 'react'
import { Box, Button } from '@i/components'
import { sketchRequest } from '../../sketchApi'

const startAuthServer = () => sketchRequest('startAuthServer')

const LogIn = () => (
	<Box padding={4}>
		<Button
			padding={2}
			color="white"
			backgroundColor="blue"
			activeColor="white"
			onClick={startAuthServer}
		>
			Log In
		</Button>
	</Box>
)

export { LogIn }
