import React from 'react'
import { Text } from '@i/components'
import type { ThemeLineHeight } from '@i/theme'

const LineHeight = ({
	id,
	index,
	value,
	imported,
	...props
}: ThemeLineHeight & {
	imported?: boolean
	index: number
}) => {
	return (
		<Text>
			Line height
		</Text>
	)
}

export { LineHeight }
