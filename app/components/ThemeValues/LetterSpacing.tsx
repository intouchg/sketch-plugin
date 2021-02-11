import React from 'react'
import { NoWrapText } from '../NoWrapText'
import type { ThemeLetterSpacing } from '@i/theme'

const LetterSpacing = ({
	value,
	...props
}: ThemeLetterSpacing) => (
	<NoWrapText
		width="100%"
		fontSize="1.5rem"
		fontWeight={4}
		letterSpacing={value}
		textAlign="left"
	>
		Lorem ipsum dolor sit amet
	</NoWrapText>
)

export { LetterSpacing }
