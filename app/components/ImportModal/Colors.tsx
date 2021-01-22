import React from 'react'
import { Box, InvisibleButton } from '@i/components'
import { Color } from '../ThemeValues'
import { ColorGrid } from '../ColorGrid'
import { ImportIcon } from './ImportIcon'
import { sortAlphabetical } from '@i/utility'
import type { ThemeColor } from '@i/theme'

const sortColors = (a: ThemeColor, b: ThemeColor) => sortAlphabetical(a, b, 'name')

const Colors = ({
	values = [],
	importedValues = [],
	toggleSelectedImportedValue,
}: {
	values: ThemeColor[]
	importedValues: (ThemeColor & { imported?: boolean, selected?: boolean })[]
	toggleSelectedImportedValue: (color: ThemeColor & { willOverwriteByName?: boolean }) => void
}) => {
	const uniqueImportedValues = importedValues.filter(({ name, value }) => !values.some((v) => v.name === name && v.value === value))
	const uniqueThemeValues = values.filter(({ name }) => !uniqueImportedValues.some((v) => v.name === name))

	const sortedUniqueColors = uniqueImportedValues
		.map((i) => ({ ...i, willOverwriteByName: values.some((v) => v.name === i.name) }))
		.concat(uniqueThemeValues as any)
		.sort(sortColors)

	return (
		<ColorGrid gridGap={3}>
			{sortedUniqueColors.map(({ imported, selected, willOverwriteByName, ...props }) => {
				const { value } = props
				const alreadySaved = !imported && importedValues.some((v) => v.value === value && v.name === props.name)

				return (
					<Box
						key={props.id}
						position="relative"
						height="0"
						paddingBottom="65.31%"
						flexGrow={1}
						as={imported ? InvisibleButton : undefined}
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
								willOverwrite={willOverwriteByName}
							/>
						</Box>
					</Box>
				)
			})}
		</ColorGrid>
	)
}

export { Colors }
