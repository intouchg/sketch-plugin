import React from 'react'
import { Stack, Flex, Text } from '@i/components'
import { LineHeight } from '../ThemeValues'
import { Checkbox, CheckboxPlaceholder } from '../Checkbox'
import { InvisibleButton } from '../InvisibleButton'
import type { ThemeLineHeight } from '@i/theme'

const sortLineHeights = (a: ThemeLineHeight, b: ThemeLineHeight) => {
	const valueA = Number(a.value.split('rem')[0])
	const valueB = Number(b.value.split('rem')[0])
	return (valueA < valueB ? -1 : valueA > valueB ? 1 : 0)
}

const LineHeights = ({
	values = [],
	importedValues = [],
	toggleSelectedImportedValue,
}: {
	values: ThemeLineHeight[]
	importedValues: (ThemeLineHeight & { imported?: boolean, selected?: boolean })[]
	toggleSelectedImportedValue: (lineHeight: ThemeLineHeight) => void
}) => {
	const uniqueImportedValues = importedValues.filter(({ value }) => !values.some((v) => v.value === value))
	const sortedUniqueLineHeights = uniqueImportedValues.concat(values as any).sort(sortLineHeights)

	return (
		<Stack
			alignItems="center"
			flexGrow={1}
			marginY="auto"
		>
			{sortedUniqueLineHeights.map(({ imported, selected, ...props }) => {
				const { value } = props
				const alreadySaved = !imported && importedValues.some((v) => v.value === value)

				return (
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
							) : alreadySaved ? (
								<Checkbox
									checked
									disabled
									marginRight={3}
								/>
							) : (
								<CheckboxPlaceholder marginRight={3} />
							)}
							<Text>
								{value.split('rem')[0]}
							</Text>
						</Flex>
						<LineHeight {...props} />
					</Flex>
				)
			})}
		</Stack>
	)
}

export { LineHeights }
