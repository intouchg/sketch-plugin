import React from 'react'
import { Flex, Box, Text } from '@i/components'
import type { ThemeBorderWidth } from '@i/theme'

const BorderWidth = ({
	value,
	...props
}: ThemeBorderWidth) => (
	<Box
		flexGrow={1}
		height={value}
		marginY="auto"
		backgroundColor="#232323"
	/>
)

export { BorderWidth }
