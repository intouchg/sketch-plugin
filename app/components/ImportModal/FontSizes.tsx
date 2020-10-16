import React from 'react'
import styled from 'styled-components'
import { Flex, Box, Text } from '@i/components'
import type { ThemeFontSize } from '@i/theme'

const FontSizes = ({
	fontSizes = [],
	routeSelectedImportStyles,
	toggleSelectedImportStyle,
}: {
	fontSizes: (ThemeFontSize & { imported?: boolean })[]
	routeSelectedImportStyles: ThemeFontSize[]
	toggleSelectedImportStyle: (fontSize: ThemeFontSize) => void
}) => {
	return (
		<Text>
			Type Scale
		</Text>
	)
}

export { FontSizes }
