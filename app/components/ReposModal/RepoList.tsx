import React from 'react'
import styled from 'styled-components'
import { Stack, Text, space, font, fontWeight, color, radius } from '@i/components'
import type { AzureUserConnection, AzureGitRepo } from '@i/azure'

const Repo = styled.div`
	padding: ${space(4)} ${space(4)};
	margin-bottom: ${space(2)};
	font-family: ${font('Avenir Next')};
	font-weight: ${fontWeight(4)};
	color: ${color('Text')};
	background-color: ${color('Card')};
	border: 0;
	border-radius: ${radius(3)};
	text-transform: none;
	cursor: pointer;
`

const RepoList = ({
	repos,
	setSelectedRepo,
}: {
	repos: AzureUserConnection['gitRepos']
	setSelectedRepo: React.Dispatch<React.SetStateAction<AzureGitRepo | null>>
}) => {
	return (
		<Stack
			flexGrow={1}
			alignItems="center"
			paddingX={6}
			paddingBottom={6}
			backgroundColor="Background"
			overflow="scroll"
		>
			{repos.map(([ organizationName, gitRepos ]) => (
				<Stack
					key={organizationName}
					width="100%"
					maxWidth="560px"
					flexShrink={0}
					marginTop={4}
				>
					<Text
						variant="Accent"
						marginBottom={2}
					>
						{organizationName}
					</Text>
					{gitRepos.map((repo) => (
						<Repo
							key={repo.id}
							onClick={() => setSelectedRepo(repo)}
						>
							{repo.name}
						</Repo>
					))}
				</Stack>
			))}
		</Stack>
	)
}

export { RepoList }
