import React from 'react'
import { Box, Heading } from '@i/components'
import type { ThemeBorderProperties } from '@i/theme'

const ThemeBorders = ({
	borders,
	borderWidths,
	borderStyles,
}: ThemeBorderProperties) => {
	return (
		<Box
			width={1}
			backgroundColor="grey.1"
		/>
	)
}

const Borders = ({
	borders,
	borderWidths,
	borderStyles,
}: ThemeBorderProperties) => (
	<Box>
		<Heading>
			Borders
		</Heading>
		<ThemeBorders
			borders={borders}
			borderWidths={borderWidths}
			borderStyles={borderStyles}
		/>
	</Box>
)

export { Borders }
