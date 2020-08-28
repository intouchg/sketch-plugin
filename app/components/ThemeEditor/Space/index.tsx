import React from 'react'
import { Box, Heading } from '@i/components'
import type { ThemeSpaceProperties } from '@i/theme'

const ThemeSpace = ({
	space,
}: ThemeSpaceProperties) => {
	return (
		<Box
			width={1}
			backgroundColor="grey.1"
		/>
	)
}

const Space = ({
	space,
}: ThemeSpaceProperties) => (
	<Box>
		<Heading>
			Space
		</Heading>
		<ThemeSpace space={space} />
	</Box>
)

export { Space }
