import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Stack } from '@i/components'
import { sortAlphabetical } from '@i/utility'
import { FontFamily } from '../ThemeValues'
import type { ThemeFont, ThemeFontWeight } from '@i/theme'

// TO DO: Loading component

const Fonts = ({
	fonts = [],
	fontWeights = [],
}: {
	fonts: (ThemeFont & { imported?: boolean })[]
	fontWeights: (ThemeFontWeight & { imported?: boolean })[]
}) => {
	const systemFonts = useSelector((state) => state.theme.systemFonts)

	if (!Object.keys(systemFonts).length) {
		return <>LOADING</>
	}

	const filteredSystemFonts = fonts.map(({ value }) => systemFonts[value]).sort((a, b) => sortAlphabetical(a, b, 'name'))

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
