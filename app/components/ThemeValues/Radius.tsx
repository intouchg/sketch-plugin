import React from 'react'
import { Box } from '@i/components'
import type { ThemeRadius } from '@i/theme'

export const themeRadiusHeight = 90

const Radius = ({
	value,
	...props
}: ThemeRadius) => (
	<Box
		width="100%"
		height={themeRadiusHeight}
		backgroundColor="Card"
		borderWidth="1px"
		borderStyle="solid"
		borderColor="Accent"
		borderRadius={value}
	/>
)

export { Radius }
