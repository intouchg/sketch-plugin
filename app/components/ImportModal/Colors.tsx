import React from 'react'
import { Stack, Box, Button, Text } from '@i/components'
import { Color } from '../ThemeValues'
import { ColorGrid } from '../ColorGrid'
import { ImportIcon } from './ImportIcon'
import { sortAlphabetical } from '@i/utility'
import type { ImportedValueProps } from './index'
import type { ThemeColor } from '@i/theme'

const sortColors = (a: ThemeColor, b: ThemeColor) => sortAlphabetical(a, b, 'name')

const getUniqueImportedColors = (themeColors: ThemeColor[], importedColors: (ThemeColor & ImportedValueProps)[]) => {
	const uniqueImportedColors = []
	const uniqueImportedChangedColors = []
	let index = importedColors.length

	while (index > 0) {
		index--
		const { name, value } = importedColors[index]

		const colorToOverwrite = themeColors.find((v) => v.name === name)

		if (!colorToOverwrite) {
			uniqueImportedColors.push(importedColors[index])
		}
		else if (colorToOverwrite.value !== value) {
			uniqueImportedChangedColors.push({ ...importedColors[index], willOverwriteByName: true })
		}
	}

	return {
		uniqueImportedColors: uniqueImportedColors.sort(sortColors),
		uniqueImportedChangedColors: uniqueImportedChangedColors.sort(sortColors),
	}
}

const getUniqueThemeColors = (themeColors: ThemeColor[], uniqueImportedColors: ThemeColor[]) => {
	const uniqueThemeColors = []
	let index = themeColors.length

	while (index > 0) {
		index--
		const { name } = themeColors[index]

		if (!uniqueImportedColors.some((v) => v.name === name)) {
			uniqueThemeColors.push(themeColors[index])
		}
	}

	return uniqueThemeColors.sort(sortColors)
}

const Swatch = ({
	imported,
	selected,
	alreadySaved,
	toggleSelectedImportedValue,
	willOverwriteByName,
	...props
}: ThemeColor & {
	imported?: boolean
	selected?: boolean
	alreadySaved?: boolean
	toggleSelectedImportedValue: (color: ThemeColor & { willOverwriteByName?: boolean }) => void
	willOverwriteByName?: boolean
}) => (
	<Box
		invisible
		position="relative"
		height="0"
		paddingBottom="100%"
		flexGrow={1}
		as={imported ? Button : undefined}
		onClick={imported ? () => toggleSelectedImportedValue({ ...props, willOverwriteByName }) : undefined}
	>
		<Color
			selected={selected}
			{...props}
		/>
		<Box
			position="absolute"
			top="0"
			right="0"
		>
			<ImportIcon
				imported={imported}
				selected={selected}
				alreadySaved={alreadySaved}
			/>
		</Box>
	</Box>
)

const Colors = ({
	values = [],
	importedValues = [],
	toggleSelectedImportedValue,
}: {
	values: ThemeColor[]
	importedValues: (ThemeColor & ImportedValueProps)[]
	toggleSelectedImportedValue: (color: ThemeColor & { willOverWriteByName?: boolean }) => void
}) => {
	const { uniqueImportedColors, uniqueImportedChangedColors } = getUniqueImportedColors(values, importedValues)
	const uniqueThemeColors = getUniqueThemeColors(values, uniqueImportedColors.concat(uniqueImportedChangedColors))

	return (
		<Stack
			width="100%"
			flexGrow={1}
			marginY="auto"
		>
			{uniqueImportedChangedColors.length > 0 && (
				<>
					<Text
						variant="Accent"
						marginBottom={3}
					>
						Changed
					</Text>
					<ColorGrid
						gridGap={2}
						marginBottom={6}
					>
						{uniqueImportedChangedColors.map((props) => (
							<Swatch
								key={props.id}
								toggleSelectedImportedValue={toggleSelectedImportedValue}
								{...props}
							/>
						))}
					</ColorGrid>
				</>
			)}
			{uniqueImportedColors.length > 0 && (
				<>
					<Text
						variant="Accent"
						marginBottom={3}
					>
						New
					</Text>
					<ColorGrid
						gridGap={2}
						marginBottom={6}
					>
						{uniqueImportedColors.map((props) => (
							<Swatch
								key={props.id}
								toggleSelectedImportedValue={toggleSelectedImportedValue}
								{...props}
							/>
						))}
					</ColorGrid>
				</>
			)}
			{uniqueThemeColors.length > 0 && (
				<>
					<Text
						variant="Accent"
						marginBottom={3}
					>
						Project
					</Text>
					<ColorGrid
						gridGap={2}
						marginBottom={6}
					>
						{uniqueThemeColors.map((props) => {
							const { value, name } = props
							const alreadySaved = importedValues.some((v) => v.value === value && v.name === name)

							return (
								<Swatch
									key={props.id}
									alreadySaved={alreadySaved}
									toggleSelectedImportedValue={toggleSelectedImportedValue}
									{...props}
								/>
							)
						})}
					</ColorGrid>
				</>
			)}
		</Stack>
	)
}

export { Colors }
