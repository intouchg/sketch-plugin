import React from 'react'
import styled from 'styled-components'
import { Stack, Link, Text } from '@i/components'
import { InvisibleButton } from '../InvisibleButton'
import type { AzureUserConnection } from '@i/azure'

const OrganizationButton = styled(Link).attrs({ as: InvisibleButton })`
	${({ theme }) => `
		flex-shrink: 0;
		padding: ${theme.space[2]};
		padding-bottom: calc(${theme.space[2]} - 2px);
		margin-left: -${theme.space[2]};
		margin-right: -${theme.space[2]};
		border-radius: ${theme.radii.Small};
		line-height: 1;
		text-decoration: none;
		text-align: left;
	`}
`

const LeftToolbar = ({
	repos,
	selectedOrganization,
	setSelectedOrganization,
}: {
	repos: AzureUserConnection['gitRepos']
	selectedOrganization: string
	setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>
}) => {
	return (
		<Stack
			width="236px"
			borderRight="1px solid Accent"
			padding={3}
			backgroundColor="Card"
			overflow="scroll"
			zIndex={1}
		>
			<Text
				variant="Accent"
				marginBottom={1}
			>
				Organization
			</Text>
			<OrganizationButton
				backgroundColor={selectedOrganization === '' ? 'Primary Lighter' : 'transparent'}
				onClick={() => setSelectedOrganization('')}
			>
				All
			</OrganizationButton>
			{repos.map(([ organizationName ]) => (
				<OrganizationButton
					key={organizationName}
					backgroundColor={selectedOrganization === organizationName ? 'Primary Lighter' : 'transparent'}
					onClick={() => setSelectedOrganization(organizationName)}
				>
					{organizationName}
				</OrganizationButton>
			))}
		</Stack>
	)
}

export { LeftToolbar }
