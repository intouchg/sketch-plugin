import React from 'react'
import styled from 'styled-components'
import { Stack, Link, Text, space, radius } from '@i/components'
import type { AzureUserConnection } from '@i/azure'

const OrganizationButton = styled(Link)`
	flex-shrink: 0;
	padding: ${space(2)};
	padding-bottom: calc(${space(2)} - 2px);
	margin-left: -${space(2)};
	margin-right: -${space(2)};
	border-radius: ${radius(1)};
	line-height: 1;
	text-decoration: none;
	text-align: left;
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
