import React from 'react'
import { Text } from '@i/components'
import type { SPFontTypeface } from '../../sketchApi'

const Font = ({
	_name,
	style,
}: SPFontTypeface) => (
	<Text
		variant="secondary"
		color="Text"
		fontFamily={_name}
	>
		{style}
	</Text>
)

export { Font }
