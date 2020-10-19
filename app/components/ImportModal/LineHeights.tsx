import React from 'react'
import { Stack, Flex } from '@i/components'
import { LineHeight } from '../ThemeValues'
import { SecondaryText } from '../Texts'
import { Checkbox, CheckboxPlaceholder } from '../Checkbox'
import { InvisibleButton } from '../Buttons'
import type { ThemeLineHeight } from '@i/theme'

const LineHeights = ({
	values = [],
	importedValues = [],
	toggleSelectedImportedValue,
}: {
	values: ThemeLineHeight[]
	importedValues: (ThemeLineHeight & { imported?: boolean, selected?: boolean })[]
	toggleSelectedImportedValue: (lineHeight: ThemeLineHeight) => void
}) => {
	const filteredImportedValues = importedValues.filter(({ value }) => !values.some((v) => v.value === value))
	const sortedLineHeights = filteredImportedValues.concat(values as any).sort((a, b) => {
		const valueA = Number(a.value.split('rem')[0])
		const valueB = Number(b.value.split('rem')[0])
		return (valueA < valueB ? -1 : valueA > valueB ? 1 : 0)
	})

	return (
		<Stack alignItems="center">
			{sortedLineHeights.map(({ imported, selected, ...props }) => (
				<Flex
					key={props.id}
					maxWidth="640px"
					alignItems="center"
					marginBottom={4}
					as={imported ? InvisibleButton : undefined}
					onClick={imported ? () => toggleSelectedImportedValue(props) : undefined}
				>
					{imported ? (
						<Checkbox
							checked={Boolean(selected)}
							marginRight={4}
						/>
					) : (
						<CheckboxPlaceholder marginRight={3} />
					)}
					<LineHeight {...props} />
				</Flex>
            ))}
		</Stack>
	)
}

export { LineHeights }
