import React from 'react'
import { Flex, Box } from '@i/components'
import { Color } from '../ThemeValues'
import { Checkbox } from '../Checkbox'
import { OverwriteIcon } from '../Icons'
import { InvisibleButton } from '../Buttons'
import { ColorGrid } from '../ColorGrid'
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
			{sortedUniqueColors.map(({ imported, selected, willOverwriteByName, ...props }) => (
				<Box
					key={props.id}
					position="relative"
					height="0"
					paddingBottom="65.31%"
					flexGrow={1}
					as={imported ? InvisibleButton : undefined}
					onClick={imported ? () => toggleSelectedImportedValue({ ...props, willOverwriteByName }) : undefined}
				>
					<Color {...props} />
					{imported && (
						<Checkbox
							position="absolute"
							top="0"
							right="0"
							margin={2}
							checked={Boolean(selected)}
						/>
					)}
					{imported && willOverwriteByName && (
						<Flex
							position="absolute"
							bottom="0"
							right="0"
							alignItems="center"
							justifyContent="center"
							width="20px"
							height="20px"
							margin={2}
							backgroundColor="Card"
							borderRadius="50%"
						>
							<OverwriteIcon
								width="16px"
								height="16px"
								fill="Caution Dark"
							/>
						</Flex>
					)}
				</Box>
			))}
		</ColorGrid>
	)
}

export { Colors }
