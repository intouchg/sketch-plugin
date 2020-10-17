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
	importedValues: (ThemeFontSize & { imported?: boolean })[]
	selectedImportedValues: ThemeFontSize[]
	toggleSelectedImportedValue: (fontSize: ThemeFontSize) => void
}) => {
	const filteredImportedValues = importedValues.filter(({ value }) => !values.some((v) => v.value === value))
	const sortedFontSizes = filteredImportedValues.concat(values as any).sort((a, b) => {
		const valueA = parseInt(a.value.split('rem')[0], 10)
		const valueB = parseInt(b.value.split('rem')[0], 10)
		return (valueA < valueB ? -1 : valueA > valueB ? 1 : 0)
	})

	return (
		<Text>
			Type Scale
		</Text>
	)
}

export { FontSizes }
