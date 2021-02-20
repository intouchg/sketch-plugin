import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { createUuid } from '@i/utility'
import { Stack, Link, Text, space, radius, color } from '@i/components'
import { topToolbarHeight } from './TopToolbar'

const activeLinkClass = 'c' + createUuid()

const StyledLink = styled(Link).attrs({
	as: NavLink,
	activeClassName: activeLinkClass,
})<React.ComponentProps<typeof NavLink>>`
	padding: ${space(2)};
	padding-bottom: calc(${space(2)} - 2px);
	margin-left: -${space(2)};
	margin-right: -${space(2)};
	border-radius: ${radius(1)};
	line-height: 1;
	text-decoration: none;

	&.${activeLinkClass} {
		background-color: ${color('Primary Lighter')};
	}
`

const ThemeNavigation = () => (
	<Stack
		flexShrink={0}
		paddingBottom={3}
	>
		<Text
			variant="Accent"
			marginBottom={1}
		>
			Theme
		</Text>
		<Stack>
			<StyledLink to="theme/colors/">
				Colors
			</StyledLink>
			<StyledLink to="theme/fonts/">
				Fonts
			</StyledLink>
			<StyledLink to="theme/fontSizes/">
				Font Sizes
			</StyledLink>
			<StyledLink to="theme/lineHeights/">
				Line Heights
			</StyledLink>
			<StyledLink to="theme/letterSpacings/">
				Letter Spacings
			</StyledLink>
			<StyledLink to="theme/shadows/">
				Shadows
			</StyledLink>
			<StyledLink to="theme/borderWidths/">
				Border Widths
			</StyledLink>
			<StyledLink to="theme/radii/">
				Radii
			</StyledLink>
			<StyledLink to="theme/space/">
				Space
			</StyledLink>
		</Stack>
	</Stack>
)

const ComponentNavigation = () => (
	<Stack
		flexShrink={0}
		paddingBottom={3}
	>
		<Text
			variant="Accent"
			marginBottom={1}
		>
			Components
		</Text>
		<Stack>
			<StyledLink to="components/button/">
				Button
			</StyledLink>
			<StyledLink to="components/heading/">
				Heading
			</StyledLink>
			<StyledLink to="components/icon/">
				Icon
			</StyledLink>
			<StyledLink to="components/input/">
				Input
			</StyledLink>
			<StyledLink to="components/label/">
				Label
			</StyledLink>
			<StyledLink to="components/link/">
				Link
			</StyledLink>
			<StyledLink to="components/text/">
				Text
			</StyledLink>
		</Stack>
	</Stack>
)

export const leftNavbarWidth = 180

const LeftNavbar = () => {
	return (
		<Stack
			width={leftNavbarWidth}
			height={`calc(100vh - ${topToolbarHeight}px)`}
			flexShrink={0}
			padding={3}
			backgroundColor="Card"
			borderRightWidth="1px"
			borderRightStyle="solid"
			borderRightColor="Accent"
			overflow="scroll"
		>
			<ThemeNavigation />
			<ComponentNavigation />
		</Stack>
	)
}

export { LeftNavbar }
