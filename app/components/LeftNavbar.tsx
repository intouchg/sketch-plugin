import React from 'react'
import { Stack, Link } from '@i/components'
import { AccentText } from './index'

const ThemeNavigation = () => (
	<Stack paddingBottom={3}>
		<AccentText marginBottom={2}>
			Theme
		</AccentText>
		<Stack>
			<Link>
				Colors
			</Link>
			<Link>
				Fonts
			</Link>
			<Link>
				Type Scale
			</Link>
			<Link>
				Elevation
			</Link>
			<Link>
				Spacing
			</Link>
			<Link>
				Borders
			</Link>
		</Stack>
	</Stack>
)

const ComponentNavigation = () => (
	<Stack paddingBottom={3}>
		<AccentText marginBottom={2}>
			Components
		</AccentText>
		<Stack>
			<Link>
				Button
			</Link>
			<Link>
				Heading
			</Link>
			<Link>
				Icon
			</Link>
			<Link>
				Input
			</Link>
			<Link>
				Link
			</Link>
			<Link>
				Text
			</Link>
		</Stack>
	</Stack>
)

const LeftNavbar = () => {
	return (
		<Stack
			width="236px"
			height="100vh"
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
