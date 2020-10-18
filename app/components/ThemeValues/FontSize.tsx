import React from 'react'
import styled from 'styled-components'
import { Text } from '@i/components'
import type { ThemeFontSize } from '@i/theme'

const NoWrapText = styled(Text)`
	white-space: nowrap;
	line-height: unset;
	overflow: hidden;
	text-overflow: ellipsis;
	align-self: center;
`

const FontSize = ({
	value,
	...props
}: ThemeFontSize) => {
	return (
		<NoWrapText
			fontSize={value}
			lineHeight={value}
		>
			The quick brown fox jumps over the lazy dog
		</NoWrapText>
	)
}

export { FontSize }
