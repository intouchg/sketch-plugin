import React from 'react'
import styled from 'styled-components'
import { NavLink, useRouteMatch } from 'react-router-dom'
import { createUuid } from '@i/utility'
import { Stack, Link } from '@i/components'
import { AccentText } from './index'

const activeLinkClass = 'c' + createUuid()

const StyledLink = styled(Link).attrs({
	as: NavLink,
	activeClassName: activeLinkClass,
})<React.ComponentProps<NavLink>>`
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

const ThemeNavigation = ({ url }: { url: string }) => (
	<Stack paddingBottom={3}>
		<AccentText marginBottom={1}>
			Theme
		</AccentText>
		<Stack>
			<StyledLink to={`${url}/theme/colors`}>
				Colors
			</StyledLink>
			<StyledLink to={`${url}/theme/fonts`}>
				Fonts
			</StyledLink>
			<StyledLink to={`${url}/theme/typescale`}>
				Type Scale
			</StyledLink>
			<StyledLink to={`${url}/theme/elevation`}>
				Elevation
			</StyledLink>
			<StyledLink to={`${url}/theme/spacing`}>
				Spacing
			</StyledLink>
			<StyledLink to={`${url}/theme/borders`}>
				Borders
			</StyledLink>
		</Stack>
	</Stack>
)

const ComponentNavigation = ({ url }: { url: string }) => (
	<Stack paddingBottom={3}>
		<AccentText marginBottom={1}>
			Components
		</AccentText>
		<Stack>
			<StyledLink to={`${url}/components/button`}>
				Button
			</StyledLink>
			<StyledLink to={`${url}/components/heading`}>
				Heading
			</StyledLink>
			<StyledLink to={`${url}/components/icon`}>
				Icon
			</StyledLink>
			<StyledLink to={`${url}/components/input`}>
				Input
			</StyledLink>
			<StyledLink to={`${url}/components/link`}>
				Link
			</StyledLink>
			<StyledLink to={`${url}/components/text`}>
				Text
			</StyledLink>
		</Stack>
	</Stack>
)

const LeftNavbar = ({ url }: { url: string }) => {
	return (
		<Stack
			width="236px"
			height="100vh"
			borderRight="1px solid Accent"
			padding={3}
			backgroundColor="Card"
		>
			<ThemeNavigation url={url} />
			<ComponentNavigation url={url} />
		</Stack>
	)
}

export { LeftNavbar }
