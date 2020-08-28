import React from 'react'
import { Box, Heading } from '@i/components'
import type { ThemeRadiusProperties } from '@i/theme'

const ThemeRadii = ({
	radii,
}: ThemeRadiusProperties) => {
	return (
		<Box
			width={1}
			backgroundColor="grey.1"
		/>
	)
}

const Radii = ({
	radii,
}: ThemeRadiusProperties) => (
	<Box>
		<Heading>
			Radii
		</Heading>
		<ThemeRadii radii={radii} />
	</Box>
)

export { Radii }
