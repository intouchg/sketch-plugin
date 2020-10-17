import React from 'react'
import styled from 'styled-components'
import { Flex, Box, Text } from '@i/components'
import type { ThemeFontSize } from '@i/theme'

const FontSizes = ({
	values = [],
	importedValues = [],
	selectedImportedValues,
	toggleSelectedImportedValue,
}: {
	values: ThemeFontSize[]
	importedValues: ThemeFontSize[]
	selectedImportedValues: ThemeFontSize[]
	toggleSelectedImportedValue: (fontSize: ThemeFontSize) => void
}) => {
	return (
		<Text>
			Type Scale
		</Text>
	)
}

export { FontSizes }
