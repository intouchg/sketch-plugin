import React from 'react'
import { Box, Stack } from '@i/components'
import type { AzureGitRepos } from '../../sketchApi'

const LeftToolbar = ({
	repos,
}: {
	repos: AzureGitRepos
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
				{/* {repos.map((repo) => (

				))} */}
			</Stack>
		</Box>
	)
}

export { LeftToolbar }
