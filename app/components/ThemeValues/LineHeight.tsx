import React from 'react'
import { Text } from '@intouchg/components'
import type { ThemeLineHeight } from '@intouchg/theme'

const LineHeight = ({
	value,
	...props
}: ThemeLineHeight) => (
	<Text
		width="100%"
		minWidth="360px"
		maxWidth="480px"
		lineHeight={value}
		textAlign="left"
	>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non numquam
		eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
		voluptatem.
	</Text>
)

export { LineHeight }
