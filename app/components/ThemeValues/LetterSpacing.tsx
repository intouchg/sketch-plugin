import React from 'react'
import { Text } from '@i/components'
import type { ThemeLetterSpacing } from '@i/theme'

const LetterSpacing = ({
	value,
	...props
}: ThemeLetterSpacing) => {
	return (
		<Text
			width="100%"
			fontSize="1.5rem"
			fontWeight="Bold"
			letterSpacing={value}
			textAlign="left"
		>
			Lorem ipsum dolor sit amet
		</Text>
	)
}

export { LetterSpacing }
