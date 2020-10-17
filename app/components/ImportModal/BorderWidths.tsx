import React from 'react'
import { Stack, Box, Flex, Label } from '@i/components'
import { BorderWidth } from '../ThemeValues'
import { Checkbox } from '../Checkbox'
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
	importedValues: (ThemeBorderWidth & { imported?: boolean })[]
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
			{sortedBorderWidths.map(({ imported, ...props }) => (
				<Flex
					key={props.id}
					as={imported ? Label : undefined}
					alignItems="center"
				>
					{imported && (
						<Checkbox
							checked={selectedImportedValues.some((v) => v.id === props.id)}
							marginRight={3}
							onClick={() => toggleSelectedImportedValue(props)}
						/>
					)}
					<Box
						borderRadius="Large"
						backgroundColor={imported ? 'Background' : 'Primary'}
						marginY={2}
					>
						<BorderWidth {...props} />
					</Box>
				</Flex>
			))}
		</Stack>
	)
}

export { BorderWidths }
