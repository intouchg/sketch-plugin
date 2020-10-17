import React from 'react'
import { Flex } from '@i/components'
import { Color } from '../ThemeValues'
import { sortAlphabetical } from '@i/utility'
import type { ThemeColor } from '@i/theme'

const Colors = ({
	values = [],
	importedValues = [],
	selectedImportedValues,
	toggleSelectedImportedValue,
}: {
	values: ThemeColor[]
	importedValues: (ThemeColor & { imported: boolean })[]
	selectedImportedValues: ThemeColor[]
	toggleSelectedImportedValue: (color: ThemeColor) => void
}) => {
	const filteredThemeValues = values.filter(({ name }) => !importedValues.some((v) => v.name === name))
	const sortedColors = importedValues.concat(filteredThemeValues as any).sort((a, b) => sortAlphabetical(a, b, 'name'))

	return (
		<Flex
			flexWrap="wrap"
			padding={6}
		>
			{sortedColors.map(({ id, name, value }) => (
				<Color
					key={id}
					id={id}
					name={name}
					value={value}
				/>
			))}
		</Flex>
	)
}

export { Colors }
