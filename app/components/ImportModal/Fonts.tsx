import React from 'react'
import { useSelector } from 'react-redux'
import { Stack, Heading, Flex, Box, Label } from '@i/components'
import { sortAlphabetical } from '@i/utility'
import { Checkbox, CheckboxPlaceholder } from '../Checkbox'
import { InvisibleButton } from '../Buttons'
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
	imported,
}: SystemFontFamily & {
	values: (ThemeFont & { imported?: boolean, selected?: boolean })[]
	imported: boolean
}) => {
	return (
		<Stack marginBottom={5}>
			<Heading
				variant="Tertiary"
				marginBottom={3}
			>
				{name}
			</Heading>
			<Flex flexWrap="wrap">
				{typefaces.map((typeface) => {
					const name = typeface._name
					const matchingValue = values.find((font) => font.typeface === name)
					const selected = matchingValue && matchingValue.selected
					const alreadySaved = matchingValue && !matchingValue.imported
					const interactable = imported && !alreadySaved

					return (
						<Box
							key={name}
							paddingRight={2}
							marginBottom={2}
						>
							<Flex
								alignItems="center"
								padding={2}
								paddingRight="12px"
								borderRadius="Large"
								backgroundColor={selected ? 'Positive Light' : interactable ? 'Background' : 'transparent'}
								as={interactable ? InvisibleButton : undefined}
								// onClick={interactable ? () => toggleSelectedImportedValue(props) : undefined}
							>
								{interactable && (
									<Checkbox
										checked={Boolean(selected)}
										marginRight={2}
									/>
								)}
								{!interactable && imported && (
									<Checkbox
										checked
										disabled
										marginRight={2}
									/>
								)}
								<Font {...typeface} />
							</Flex>
						</Box>
					)
				})}
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
			{sortedUniqueSystemFonts.map(({ imported, ...systemFont }) => {
				const { name } = systemFont

				return (
					<FontFamily
						key={systemFont.name}
						values={uniqueFontValues.filter((font) => font.family === name)}
						imported={importedValues.some((v) => v.family === name)}
						{...systemFont}
					/>
				)
			})}
		</Stack>
	)
}

export { Fonts }
