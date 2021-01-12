import React from 'react'
import { Box, Stack } from '@i/components'
import type { AzureGitRepo } from '@i/azure'

const LeftToolbar = ({
	repos,
}: {
	repos: AzureGitRepo[]
}) => {
	return (
		<Box
			minWidth="280px"
			backgroundColor="Background"
			borderTopLeftRadius="Large"
			borderBottomLeftRadius="Large"
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
