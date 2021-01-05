import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { createUuid } from '@i/utility'
import { Stack, Link } from '@i/components'
import { AccentText } from './Texts'
import { topToolbarHeight } from './TopToolbar'

const activeLinkClass = 'c' + createUuid()

const StyledLink = styled(Link).attrs({
	as: NavLink,
	activeClassName: activeLinkClass,
})<React.ComponentProps<typeof NavLink>>`
	${({ theme }) => `
		padding: ${theme.space[2]};
		padding-bottom: calc(${theme.space[2]} - 2px);
		margin-left: -${theme.space[2]};
		margin-right: -${theme.space[2]};
		border-radius: ${theme.radii.Small};
		line-height: 1;
		text-decoration: none;

		&.${activeLinkClass} {
			background-color: ${theme.colors['Primary Light']};
		}
	`}
`

const ThemeNavigation = () => (
	<Stack paddingBottom={3}>
		<AccentText marginBottom={1}>
			Theme
		</AccentText>
		<Stack>
			<StyledLink to="theme/colors">
				Colors
			</StyledLink>
			<StyledLink to="theme/fonts">
				Fonts
			</StyledLink>
			<StyledLink to="theme/typescale">
				Type Scale
			</StyledLink>
			<StyledLink to="theme/elevation">
				Elevation
			</StyledLink>
			<StyledLink to="theme/spacing">
				Spacing
			</StyledLink>
			<StyledLink to="theme/borders">
				Borders
			</StyledLink>
		</Stack>
	</Stack>
)

const ComponentNavigation = () => (
	<Stack paddingBottom={3}>
		<AccentText marginBottom={1}>
			Components
		</AccentText>
		<Stack>
			<StyledLink to="components/button">
				Button
			</StyledLink>
			<StyledLink to="components/heading">
				Heading
			</StyledLink>
			<StyledLink to="components/icon">
				Icon
			</StyledLink>
			<StyledLink to="components/input">
				Input
			</StyledLink>
			<StyledLink to="components/label">
				Label
			</StyledLink>
			<StyledLink to="components/link">
				Link
			</StyledLink>
			<StyledLink to="components/text">
				Text
			</StyledLink>
		</Stack>
	</Stack>
)

const LeftNavbar = () => {
	return (
		<Stack
			width="236px"
			height={`calc(100vh - ${topToolbarHeight})`}
			minHeight="480px"
			borderRight="1px solid Accent"
			padding={3}
			backgroundColor="Card"
		>
			<ThemeNavigation />
			<ComponentNavigation />
		</Stack>
	)
}

export { LeftNavbar }
