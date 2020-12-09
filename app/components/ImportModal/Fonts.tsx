import React from 'react'
import { useSelector } from 'react-redux'
import { Stack } from '@i/components'
import { sortAlphabetical } from '@i/utility'
import { FontFamily } from '../ThemeValues'
import type { ThemeFont } from '@i/theme'
import type { SystemFontFamily } from '../../sketchApi'

// TO DO: Loading component

const sortSystemFonts = (a: SystemFontFamily, b: SystemFontFamily) => sortAlphabetical(a, b, 'name')

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

	// 1. We get fontFamily from Sketch
	// 2. Include every systemFont fontFamily from ThemeValues and Sketch import
	// 3. Checkmark every typeface in inclued systemFonts based on ThemeValues

	const uniqueImportedValues = importedValues.filter(({ family }) => !values.some((v) => v.family === family))
	const uniqueSystemFonts: (SystemFontFamily & { imported?: boolean })[] = []

	uniqueImportedValues.concat(values as any).forEach(({ family, imported }) => {
		const systemFont = systemFonts[family]

		if (systemFont) {
			uniqueSystemFonts.push({ ...systemFont, imported })
		}
	})

	const sortedUniqueSystemFonts = uniqueSystemFonts.slice().sort(sortSystemFonts)

	return (
		<Stack
			flexGrow={1}
			marginY="auto"
		>
			{sortedUniqueSystemFonts.map(({ imported, ...systemFont }) => (
				<FontFamily
					key={systemFont.name}
					{...systemFont}
				/>
			))}
		</Stack>
	)
}

export { Fonts }
