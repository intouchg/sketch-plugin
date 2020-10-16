import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Stack, Flex, Box, Text, Heading, Label } from '@i/components'
import { Checkbox } from '../Checkbox'
import { sortAlphabetical } from '@i/utility'
import type { ThemeFont, ThemeFontWeight } from '@i/theme'
import type { SystemFontsDictionary, SPFontTypeface } from '../../sketchApi'

// TO DO: Loading component

const SelectableFont = ({
	checked,
	toggleChecked,
	_name,
	style,
}: {
	checked: boolean
	toggleChecked: () => void
} & SPFontTypeface) => (
	<Box
		paddingRight={2}
		marginBottom={2}
	>
		<Label
			display="inline-block"
			padding={2}
			paddingRight="12px"
			borderRadius="Large"
			backgroundColor="Background"
		>
			<Flex alignItems="center">
				<Checkbox
					checked={checked}
					marginRight="12px"
					onClick={toggleChecked}
				/>
				<Text
					variant="secondary"
					fontFamily={_name}
				>
					{style}
				</Text>
			</Flex>
		</Label>
	</Box>
)

const FontFamily = ({
	name,
	path,
	typefaces,
}: SystemFontsDictionary[string]) => {
	return (
		<Stack marginBottom={5}>
			<Heading
				variant="Tertiary"
				marginBottom={3}
			>
				{name}
			</Heading>
			<Flex flexWrap="wrap">
				{typefaces.map((typeface) => (
					<SelectableFont
						checked
						key={typeface._name}
						toggleChecked={() => {}}
						{...typeface}
					/>
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
