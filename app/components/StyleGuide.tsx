import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Box, Test } from '@i/components'
import { topNavHeight } from './TopNavigation'
import type { Theme } from '@i/theme'

const StyleGuide = ({
	theme,
}: {
	theme: Theme | undefined
}) => {
	if (!theme) {
		return null
	}

	return (
		<Box
			position="relative"
			top={topNavHeight}
			padding={4}
		>
			<ThemeProvider theme={theme}>
				<Test />
			</ThemeProvider>
		</Box>
	)
}

export { StyleGuide }
