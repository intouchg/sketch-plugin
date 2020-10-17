import React from 'react'
import { useSelector } from 'react-redux'
import { Stack } from '@i/components'
import { sortAlphabetical } from '@i/utility'
import { FontFamily } from '../ThemeValues'
import type { ThemeFont } from '@i/theme'
import type { SystemFontFamily } from '../../sketchApi'

// TO DO: Loading component

const Fonts = ({
	values = [],
	importedValues = [],
	toggleSelectedImportedValue,
}: {
	values: ThemeFont[]
	importedValues: (ThemeFont & { imported?: boolean, selected?: boolean })[]
	toggleSelectedImportedValue: (typeface: SystemFontFamily) => void
}) => {
	const systemFonts = useSelector((state) => state.theme.systemFonts)

	if (!Object.keys(systemFonts).length) {
		return <>LOADING</>
	}

	const filteredImportedValues = importedValues.filter(({ value }) => !values.some((v) => v.value === value))
	const filteredSystemFonts: (SystemFontFamily & { imported?: boolean })[] = []

	filteredImportedValues.concat(values as any).forEach(({ value, imported }) => {
		const systemFont = systemFonts[value]

		if (systemFont) {
			filteredSystemFonts.push({ ...systemFont, imported })
		}
	})

	const sortedFilteredSystemFonts = filteredSystemFonts.slice().sort((a, b) => sortAlphabetical(a, b, 'name'))

	return (
		<Stack padding={6}>
			{sortedFilteredSystemFonts.map(({ imported, ...systemFont }) => (
				<FontFamily
					key={systemFont.name}
					{...systemFont}
				/>
			))}
		</Stack>
	)
}

export { Fonts }
