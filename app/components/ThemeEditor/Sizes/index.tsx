import React from 'react'
import { Box, Heading } from '@i/components'
import type { ThemeSizeProperties } from '@i/theme'

const ThemeSizes = ({
	sizes,
}: ThemeSizeProperties) => {
	return (
		<Box
			width={1}
			backgroundColor="grey.1"
		/>
	)
}

const Sizes = ({
	sizes,
}: ThemeSizeProperties) => (
	<Box>
		<Heading>
			Sizes
		</Heading>
		<ThemeSizes sizes={sizes} />
	</Box>
)

export { Sizes }
