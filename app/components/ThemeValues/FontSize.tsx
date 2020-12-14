import React from 'react'
import { NoWrapText } from '../NoWrapText'
import type { ThemeFontSize } from '@i/theme'

const FontSize = ({
	value,
	...props
}: ThemeFontSize) => (
	<NoWrapText
		fontSize={value}
		lineHeight={value}
	>
		The quick brown fox jumps over the lazy dog
	</NoWrapText>
)

export { FontSize }
