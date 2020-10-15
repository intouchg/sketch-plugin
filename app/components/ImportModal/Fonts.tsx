import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Stack, Flex, Box, Text, Heading, Checkbox, Label } from '@i/components'
import { CheckmarkIcon } from '../Icons'
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
	<Label
		padding={2}
		paddingRight="12px"
		borderRadius="Large"
	>
		<Flex>
			<Checkbox
				checked={checked}
				onClick={toggleChecked}
			>
				<Flex
					alignItems="center"
					justifyContent="center"
					width="24px"
					height="24px"
					backgroundColor="Card"
					border="1px solid"
					borderColor="Accent"
					borderRadius="Medium"
				>
					{checked && (<CheckmarkIcon width="16px" />)}
				</Flex>
			</Checkbox>
			<Text
				variant="secondary"
				fontFamily={_name}
			>
				{style}
			</Text>
		</Flex>
	</Label>
)

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
