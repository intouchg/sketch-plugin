import React from 'react'
import { Box, Heading } from '@i/components'
import type { ThemeFontProperties } from '@i/theme'

const ThemeFonts = ({
	fonts,
	fontSizes,
	fontWeights,
	lineHeights,
	letterSpacings,
}: ThemeFontProperties) => {
	return (
		<Box
			width={1}
			backgroundColor="grey.1"
		/>
	)
}

const Typography = ({
	fonts,
	fontSizes,
	fontWeights,
	lineHeights,
	letterSpacings,
}: ThemeFontProperties) => (
	<Box>
		<Heading>
			Typography
		</Heading>
		<ThemeFonts
			fonts={fonts}
			fontSizes={fontSizes}
			fontWeights={fontWeights}
			lineHeights={lineHeights}
			letterSpacings={letterSpacings}
		/>
	</Box>
)

export { Typography }
