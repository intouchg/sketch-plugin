import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { createUuid } from '@i/utility'
import { Stack, Link, Text, space, radius, color } from '@i/components'
import { topToolbarHeight } from './TopToolbar'

const routesData = {
	theme: {
		colors: 'Colors',
		fonts: 'Fonts',
		fontSizes: 'Font Sizes',
		lineHeights: 'Line Heights',
		letterSpacings: 'Letter Spacings',
		shadows: 'Shadows',
		borderWidths: 'Border Widths',
		radii: 'Radii',
		space: 'Space',
	},
	components: {
		buttons: 'Button',
		texts: 'Text',
		headings: 'Heading',
		links: 'Link',
		icons: 'Icon',
		labels: 'Label',
		inputs: 'Input',
		radios: 'Radio',
		checkboxes: 'Checkbox',
		selects: 'Select',
		sliders: 'Slider',
		toggles: 'Toggle',
		textareas: 'Textarea',
	},
}

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
			{Object.entries(routesData.theme).map(([ route, title ]) => (
				<StyledLink
					key={route}
					to={`theme/${route}/`}
				>
					{title}
				</StyledLink>
			))}
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
			{Object.entries(routesData.components).map(([ route, title ]) => (
				<StyledLink
					key={route}
					to={`components/${route}/`}
				>
					{title}
				</StyledLink>
			))}
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
