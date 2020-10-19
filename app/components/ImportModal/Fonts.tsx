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
	toggleSelectedImportedValue: (font: ThemeFont) => void
}) => {
	const systemFonts = useSelector((state) => state.theme.systemFonts)

	if (!Object.keys(systemFonts).length) {
		return <>LOADING</>
	}

	// TO DO: fix / finish this

	const filteredImportedValues = importedValues.filter(({ family }) => !values.some((v) => v.family === family))
	const filteredSystemFonts: (SystemFontFamily & { imported?: boolean })[] = []

	filteredImportedValues.concat(values as any).forEach(({ family, imported }) => {
		const systemFont = systemFonts[family]

		if (systemFont) {
			filteredSystemFonts.push({ ...systemFont, imported })
		}
	})

	const sortedFilteredSystemFonts = filteredSystemFonts.slice().sort((a, b) => sortAlphabetical(a, b, 'name'))

	return (
		<Stack>
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
