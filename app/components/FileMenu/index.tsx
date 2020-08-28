import React from 'react'
import { Box } from '@i/components'
import { topNavHeight } from '../TopNavigation'
import { SaveTheme } from './SaveTheme'
import { OpenStorybook } from './OpenStorybook'

const FileMenu = () => {
	return (
		<Box
			position="relative"
			top={topNavHeight}
			width={1}
			height="100%"
		>
			<SaveTheme />
			<OpenStorybook />
		</Box>
	)
}

export { FileMenu }
