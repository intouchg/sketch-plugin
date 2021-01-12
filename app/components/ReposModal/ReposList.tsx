import React from 'react'
import { Box, Stack } from '@i/components'
import type { AzureGitRepos } from '../../sketchApi'

const ReposList = ({
	repos,
}: {
	repos: AzureGitRepos
}) => {
	return (
		<Stack flexGrow={1}>
			Repos List
		</Stack>
	)
}

export { ReposList }
