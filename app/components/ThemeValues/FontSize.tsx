import React from 'react'
import { Text } from '@i/components'
import type { ThemeFontSize } from '@i/theme'

const FontSize = ({
	id,
	index,
	value,
	imported,
	...rest
}: ThemeFontSize & {
	imported?: boolean
	index: number
}) => {
	return (
		<Text>
			Font size
		</Text>
	)
}

export { FontSize }
