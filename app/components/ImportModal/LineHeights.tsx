import React from 'react'
import { Stack, Flex, Text, Button, Box } from '@i/components'
import { LineHeight } from '../ThemeValues'
import { ImportIcon } from './ImportIcon'
import type { ThemeLineHeight } from '@i/theme'

export const sortLineHeights = (a: ThemeLineHeight, b: ThemeLineHeight) => {
	const valueA = Number(a.value)
	const valueB = Number(b.value)
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
						invisible
						key={props.id}
						maxWidth="660px"
						alignItems="stretch"
						marginBottom={4}
						as={imported ? Button : undefined}
						onClick={imported ? () => toggleSelectedImportedValue(props) : undefined}
					>
						<Flex
							minWidth="92px"
							alignItems="center"
							padding={2}
							marginRight={3}
							backgroundColor={selected ? 'Primary Lighter' : imported ? 'Background' : 'transparent'}
							borderRadius={3}
							flexShrink={0}
						>
							<Box marginRight={2}>
								<ImportIcon
									imported={imported}
									selected={selected}
									alreadySaved={alreadySaved}
								/>
							</Box>
							<Text
								fontWeight={4}
								color={selected ? 'Primary' : 'Text'}
								paddingRight={2}
							>
								{value}
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
