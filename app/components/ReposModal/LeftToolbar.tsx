import React from 'react'
import { Box, Stack } from '@i/components'

const LeftToolbar = () => {
	return (
		<Box
			minWidth="280px"
			backgroundColor="Background"
			borderTopRightRadius="Large"
			borderBottomRightRadius="Large"
		>
			<Stack
				position="relative"
				height="100%"
			>
				Left Toolbar
			</Stack>
		</Box>
	)
}

export { LeftToolbar }
