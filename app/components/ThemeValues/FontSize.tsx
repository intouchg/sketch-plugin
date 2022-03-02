import React from 'react'
import { NoWrapText } from '../NoWrapText'
import type { ThemeFontSize } from '@intouchg/theme'

export const themeFontSizeLineHeight = 1.2

const FontSize = ({
	value,
	...props
}: ThemeFontSize) => (
	<NoWrapText
		fontSize={value}
		lineHeight={themeFontSizeLineHeight.toString()}
	>
		The quick brown fox jumps over the lazy dog
	</NoWrapText>
)

export { FontSize }
