import React from 'react'
import { Stack, Box, Flex } from '@i/components'
import { BorderWidth } from '../ThemeValues'
import { Checkbox, CheckboxPlaceholder } from '../Checkbox'
import { InvisibleButton } from '../Buttons'
import type { ThemeBorderWidth } from '@i/theme'

const sortBorderWidths = (a: ThemeBorderWidth, b: ThemeBorderWidth) => {
	const valueA = Number(a.value.split('px')[0])
	const valueB = Number(b.value.split('px')[0])
	return (valueA < valueB ? -1 : valueA > valueB ? 1 : 0)
}

const BorderWidths = ({
	values = [],
	importedValues = [],
	toggleSelectedImportedValue,
}: {
	values: ThemeBorderWidth[]
	importedValues: (ThemeBorderWidth & { imported?: boolean, selected?: boolean })[]
	toggleSelectedImportedValue: (borderWidth: ThemeBorderWidth) => void
}) => {
	const filteredImportedValues = importedValues.filter(({ value }) => !values.some((v) => v.value === value))
	const sortedBorderWidths = filteredImportedValues.concat(values as any).sort(sortBorderWidths)

	return (
		<Stack alignItems="center">
			{sortedBorderWidths.map(({ imported, selected, ...props }) => (
				<Flex
					key={props.id}
					width="100%"
					alignItems="center"
					as={imported ? InvisibleButton : undefined}
					onClick={imported ? () => toggleSelectedImportedValue(props) : undefined}
				>
					{imported ? (
						<Checkbox
							checked={Boolean(selected)}
							marginRight={3}
						/>
					) : (
						<CheckboxPlaceholder marginRight={3} />
					)}
					<Box
						flexGrow={1}
						marginY={2}
						borderRadius="Large"
						backgroundColor={imported ? 'transparent' : 'Background'}
					>
						<BorderWidth {...props} />
					</Box>
				</Flex>
			))}
		</Stack>
	)
}

export { BorderWidths }