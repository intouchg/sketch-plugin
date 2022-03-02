import React from 'react'
import { Flex, Box, Text } from '@intouchg/components'
import type { ThemeBorderWidth } from '@intouchg/theme'

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
