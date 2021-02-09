import React from 'react'
import { Box } from '@i/components'
import type { ThemeRadius } from '@i/theme'

const Radius = ({
	value,
	...props
}: ThemeRadius) => (
	<Box
		width="100%"
		height="90px"
		backgroundColor="Card"
		borderWidth="1px"
		borderStyle="solid"
		borderColor="Accent"
		borderRadius={value}
	/>
)

export { Radius }
