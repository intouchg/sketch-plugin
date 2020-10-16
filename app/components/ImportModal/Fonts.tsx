import React from 'react'
import { useSelector } from 'react-redux'
import { Stack } from '@i/components'
import { sortAlphabetical } from '@i/utility'
import { FontFamily } from '../ThemeValues'
import type { ThemeFont } from '@i/theme'
import type { SPFontTypeface } from '../../sketchApi'

// TO DO: Loading component

const Fonts = ({
	fonts = [],
	routeSelectedImportStyles,
	toggleSelectedImportStyle,
}: {
	fonts: (ThemeFont & { imported?: boolean })[]
	routeSelectedImportStyles: SPFontTypeface[]
	toggleSelectedImportStyle: (typeface: SPFontTypeface) => void
}) => {
	const systemFonts = useSelector((state) => state.theme.systemFonts)

	if (!Object.keys(systemFonts).length) {
		return <>LOADING</>
	}

	const filteredSystemFonts = fonts.map(({ value }) => systemFonts[value])
		.filter((v) => v !== undefined)
		.sort((a, b) => sortAlphabetical(a, b, 'name'))

	return (
		<Stack padding={6}>
			{filteredSystemFonts.map((systemFont) => (
				<FontFamily
					key={systemFont.name}
					{...systemFont}
				/>
			))}
		</Stack>
	)
}

export { Fonts }
