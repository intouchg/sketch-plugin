import React from 'react'
import { useSelector } from 'react-redux'
import { Stack, Heading, Flex } from '@i/components'
import { sortAlphabetical } from '@i/utility'
import { Font } from '../ThemeValues'
import type { ThemeFont } from '@i/theme'
import type { SystemFontFamily } from '../../sketchApi'

// TO DO: Loading component

// const SelectableFont = ({
// 	checked,
// 	toggleChecked,
// 	_name,
// 	style,
// }: {
// 	checked: boolean
// 	toggleChecked: () => void
// } & SPFontTypeface) => (
// 	<Box
// 		paddingRight={2}
// 		marginBottom={2}
// 	>
// 		<Label
// 			display="inline-block"
// 			padding={2}
// 			paddingRight="12px"
// 			borderRadius="Large"
// 			backgroundColor="Background"
// 		>
// 			<Flex alignItems="center">
// 				<Checkbox
// 					checked={checked}
// 					marginRight="12px"
// 					onClick={toggleChecked}
// 				/>
// 				<Text
// 					variant="secondary"
// 					fontFamily={_name}
// 				>
// 					{style}
// 				</Text>
// 			</Flex>
// 		</Label>
// 	</Box>
// )

const FontFamily = ({
	name,
	path,
	typefaces,
	values,
}: SystemFontFamily & {
	values: (ThemeFont & { imported?: boolean, selected?: boolean })[]
}) => {
	console.log('typefaces ', typefaces)
	console.log('values ', values)

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
					<Flex key={typeface._name}>
						<Font {...typeface} />
					</Flex>
				))}
			</Flex>
		</Stack>
	)
}

// {typefaces.map((typeface) => (
// 	<SelectableFont
// 		key={typeface._name}
// 		checked={values.some((font) => font.imported && font.typeface === typeface._name)}
// 		toggleChecked={() => {}}
// 		{...typeface}
// 	/>
// ))}

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
	const uniqueFontValues = uniqueImportedValues.concat(values as any)
	const uniqueSystemFonts: (SystemFontFamily & { imported?: boolean })[] = []

	uniqueFontValues.forEach(({ family, imported }) => {
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
					values={uniqueFontValues.filter((font) => font.family === systemFont.name)}
					{...systemFont}
				/>
			))}
		</Stack>
	)
}

export { Fonts }
