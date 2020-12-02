import React from 'react'
import { NoWrapText } from '../NoWrapText'
import type { ThemeLetterSpacing } from '@i/theme'

const LetterSpacing = ({
	value,
	...props
}: ThemeLetterSpacing) => {
	return (
		<NoWrapText
			width="100%"
			fontSize="1.5rem"
			fontWeight="Bold"
			letterSpacing={value}
			textAlign="left"
		>
			Lorem ipsum dolor sit amet
		</NoWrapText>
	)
}

export { LetterSpacing }
