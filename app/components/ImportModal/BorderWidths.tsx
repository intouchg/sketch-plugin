import React from 'react'
import { Stack, Box } from '@i/components'
import { BorderWidth } from '../ThemeValues'
import type { ThemeBorderWidth } from '@i/theme'

const sortBorderWidths = (a: ThemeBorderWidth, b: ThemeBorderWidth) => {
	const valueA = parseInt(a.value.split('px')[0], 10)
	const valueB = parseInt(b.value.split('px')[0], 10)
	return (valueA < valueB ? -1 : valueA > valueB ? 1 : 0)
}

const BorderWidths = ({
	values = [],
	importedValues = [],
	selectedImportedValues,
	toggleSelectedImportedValue,
}: {
	values: ThemeBorderWidth[]
	importedValues: (ThemeBorderWidth & { imported: boolean })[]
	selectedImportedValues: ThemeBorderWidth[]
	toggleSelectedImportedValue: (borderWidth: ThemeBorderWidth) => void
}) => {
	const filteredImportedValues = importedValues.filter(({ value }) => !values.some((v) => v.value === value))
	const sortedBorderWidths = filteredImportedValues.concat(values as any).sort(sortBorderWidths)

	return (
		<Stack
			alignItems="center"
			paddingY="146px"
		>
			{sortedBorderWidths.map(({ id, imported, ...props }) => (
				<Box
					key={id}
					borderRadius="Large"
					backgroundColor={imported ? 'Background' : 'Primary'}
					marginBottom={2}
				>
					<BorderWidth
						key={id}
						id={id}
						{...props}
					/>
				</Box>
			))}
		</Stack>
	)
}

export { BorderWidths }
