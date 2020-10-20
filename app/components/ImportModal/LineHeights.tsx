import React from 'react'
import { Stack, Flex, Text } from '@i/components'
import { LineHeight } from '../ThemeValues'
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
					alignItems="stretch"
					marginBottom={4}
					as={imported ? InvisibleButton : undefined}
					onClick={imported ? () => toggleSelectedImportedValue(props) : undefined}
				>
					<Flex
						minWidth="115px"
						alignItems="center"
						paddingX={3}
						paddingY={2}
						marginRight={3}
						backgroundColor={selected ? 'Positive Light' : imported ? 'Background' : 'transparent'}
						borderRadius="Large"
						flexShrink={0}
					>
						{imported ? (
							<Checkbox
								checked={Boolean(selected)}
								marginRight={3}
							/>
						) : (
							<CheckboxPlaceholder marginRight={3} />
						)}
						<Text>
							{props.value.split('rem')[0]}
						</Text>
					</Flex>
					<LineHeight {...props} />
				</Flex>
            ))}
		</Stack>
	)
}

export { LineHeights }
