import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Stack, Flex, Box, Text, Heading } from '@i/components'
import type { ThemeFont, ThemeFontWeight } from '@i/theme'
import type { SystemFontsDictionary } from '../../sketchApi'

// TO DO: Loading component

// const SelectableFont = () => {
// 	return ()
// }

const FontFamily = ({
	name,
	path,
	typefaces,
}: SystemFontsDictionary[string]) => {
	return (
		<Stack marginBottom={5}>
			<Heading variant="Secondary">
				{name}
			</Heading>
			<Flex>
				{typefaces && typefaces.map(({ _name, style }) => (
					<Text
						key={_name}
						variant="secondary"
						fontFamily={_name}
					>
						{style}
					</Text>
				))}
			</Flex>
		</Stack>
	)
}

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

	const filteredSystemFonts = fonts.map(({ value }) => systemFonts[value])

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
