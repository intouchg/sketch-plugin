import React from 'react'
import { Box } from '@i/components'
import { topNavHeight } from './TopNavigation'

const SettingsMenu = () => (
	<Box
		position="relative"
		top={topNavHeight}
		width={1}
		height="100%"
		padding={4}
	>
		Settings Menu
	</Box>
)

export { SettingsMenu }
