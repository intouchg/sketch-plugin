import React from 'react'
import styled from 'styled-components'
import { useSpring, animated, config } from 'react-spring'
import { Stack } from '@i/components'
import { AccentText } from '../Texts'
import type { AzureGitRepos } from '../../sketchApi'
import type { AzureGitRepo } from '@i/azure'

const RepoBox = styled(animated.div)`
	${({ theme }) => `
		padding: ${theme.space[4]} ${theme.space[4]};
		margin-bottom: ${theme.space[2]};
		color: ${theme.colors.Text};
		background-color: ${theme.colors.Card};
		border: 0;
		border-radius: ${theme.radii.Large};
		text-transform: none;
		cursor: pointer;
	`}
`

const RepoButton = ({
	selectedRepoId,
	setSelectedRepoId,
	...repo
}: AzureGitRepo & {
	selectedRepoId: string
	setSelectedRepoId: React.Dispatch<React.SetStateAction<string>>
}) => {
	const active = selectedRepoId === repo.id
	const spring = useSpring({
		transform: `translateX(${active ? '20px' : '0px'})`,
		borderLeft: active ? '1px solid #2c90ce' : '1px solid #ffffff',
	})

	return (
		<RepoBox
			style={spring}
			onClick={() => active ? setSelectedRepoId('') : setSelectedRepoId(repo.id)}
		>
			{repo.name}
		</RepoBox>
	)
}

const ReposList = ({
	repos,
	selectedRepoId,
	setSelectedRepoId,
}: {
	repos: AzureGitRepos
	selectedRepoId: string
	setSelectedRepoId: React.Dispatch<React.SetStateAction<string>>
}) => {
	return (
		<Stack
			flexGrow={1}
			padding={6}
			backgroundColor="Background"
			overflow="scroll"
			borderTopRightRadius="Large"
		>
			{Object.entries(repos).map(([ organizationName, gitRepos ]) => (
				<Stack
					key={organizationName}
					flexShrink={0}
				>
					<AccentText marginBottom={2}>
						{organizationName}
					</AccentText>
					{gitRepos.map((repo) => (
						<RepoButton
							key={repo.id}
							selectedRepoId={selectedRepoId}
							setSelectedRepoId={setSelectedRepoId}
							{...repo}
						/>
					))}
				</Stack>
			))}
		</Stack>
	)
}

export { ReposList }
