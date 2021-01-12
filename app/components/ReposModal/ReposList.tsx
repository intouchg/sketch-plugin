import React from 'react'
import { Box, Stack } from '@i/components'
import type { AzureGitRepo } from '@i/azure'

const ReposList = ({
	repos,
}: {
	repos: AzureGitRepo[]
}) => {
	return (
		<Stack flexGrow={1}>
			Repos List
		</Stack>
	)
}

export { ReposList }
