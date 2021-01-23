import React from 'react'
import { useSelector } from 'react-redux'
import { Stack, Heading, Flex, Box, InvisibleButton } from '@i/components'
import { sortAlphabetical } from '@i/utility'
import { Font } from '../ThemeValues'
import { Loading } from '../Loading'
import { ImportIcon } from './ImportIcon'
import type { ThemeFont } from '@i/theme'
import type { SystemFontFamily } from '../../sketchApi'

const FontFamily = ({
	name,
	path,
	typefaces,
	values,
	imported,
	toggleSelectedImportedValue,
}: SystemFontFamily & {
	values: (ThemeFont & { imported?: boolean, selected?: boolean })[]
	imported: boolean
	toggleSelectedImportedValue: (font: ThemeFont) => void
}) => {
	const toggleTypeface = (value?: ThemeFont & { imported?: boolean, selected?: boolean }) => {
		if (value) {
			const { selected: s, imported: i, ...props } = value
			toggleSelectedImportedValue(props)
		}
	}

	return (
		<Stack marginBottom={6}>
			<Flex marginBottom={3}>
				<Heading
					variant="Tertiary"
					paddingTop={1}
					marginRight={2}
				>
					{name}
				</Heading>
				{!imported && (
					<ImportIcon
						imported={false}
						selected={false}
						alreadySaved={false}
					/>
				)}
			</Flex>
			<Flex flexWrap="wrap">
				{typefaces.map((typeface) => {
					const name = typeface._name
					const matchingValue = values.find((font) => font.typeface === name)
					const selected = matchingValue && matchingValue.selected
					const alreadySaved = matchingValue && !matchingValue.imported
					const interactable = imported && !alreadySaved

					return (
						<Flex
							key={name}
							paddingRight={2}
							marginBottom={2}
						>
							<Flex
								alignItems="center"
								padding={2}
								paddingRight="12px"
								borderRadius="Large"
								backgroundColor={selected ? 'Primary Lighter' : interactable ? 'Background' : 'transparent'}
								as={interactable ? InvisibleButton : undefined}
								onClick={interactable ? () => toggleTypeface(matchingValue) : undefined}
							>
								{interactable && (
									<Box marginRight={2}>
										<ImportIcon
											imported
											selected={Boolean(selected)}
											alreadySaved={alreadySaved}
										/>
									</Box>
								)}
								<Font {...typeface} />
							</Flex>
						</Flex>
					)
				})}
			</Flex>
		</Stack>
	)
}

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
		return (
			<Loading />
		)
	}

	const uniqueImportedValues = importedValues.filter(({ typeface }) => !values.some((v) => v.typeface === typeface))
	const uniqueFontValues = uniqueImportedValues.concat(values as any)
	const uniqueSystemFonts: (SystemFontFamily & { imported?: boolean })[] = []

	uniqueFontValues.forEach(({ family, imported }) => {
		const systemFont = systemFonts[family]

		if (systemFont && !uniqueSystemFonts.some((sf) => sf.name === systemFont.name)) {
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
						toggleSelectedImportedValue={toggleSelectedImportedValue}
						{...systemFont}
					/>
				)
			})}
		</Stack>
	)
}

export { Fonts }
