import React from 'react'
import { Text } from '@i/components'
import type { ThemeLineHeight } from '@i/theme'

const LineHeight = ({
	value,
	...props
}: ThemeLineHeight) => {
	return (
		<Text>
			Line height
		</Text>
	)
}

export { LineHeight }
