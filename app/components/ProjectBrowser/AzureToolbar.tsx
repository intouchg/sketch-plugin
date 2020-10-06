import React from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Button, Input } from '@i/components'
import { createThemeGroup } from '../../store'
import { sketchRequest } from '../../sketchApi'
import { themeEditorLeftNavWidth } from '../ThemeEditor'
import type { AzureGitRepo } from '@i/azure'

const AzureToolbar = ({
	searchRepos,
	selectedRepo,
}: {
    searchRepos: (event: React.ChangeEvent<HTMLInputElement>) => void
	selectedRepo: AzureGitRepo | undefined
}) => {
	const dispatch = useDispatch()
	const downloadRepo = () => sketchRequest('cloneAzureGitRepo', selectedRepo)

	return (
		<Flex
			width={1}
			height={31}
			alignItems="center"
			justifyContent="space-between"
			paddingLeft={themeEditorLeftNavWidth}
			paddingRight={themeEditorLeftNavWidth}
		>
			<Input
				padding={2}
				border="1px solid"
				borderColor="grey.3"
				borderRadius="small"
				type="text"
				placeholder="Search Projects"
				onChange={searchRepos}
			/>
			{selectedRepo && (
				<Button
					padding={1}
					color="white"
					backgroundColor="green"
					activeColor="white"
					border="2px solid"
					borderColor="green"
					marginX={4}
					onClick={downloadRepo}
				>
					Download Repo
				</Button>
			)}
		</Flex>
	)
}

export { AzureToolbar }
