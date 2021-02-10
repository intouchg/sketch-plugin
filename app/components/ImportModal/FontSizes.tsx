import React from 'react'
import { Stack, Flex, Text, Button, Box } from '@i/components'
import { FontSize } from '../ThemeValues'
import { ImportIcon } from './ImportIcon'
import type { ThemeFontSize } from '@i/theme'

export const sortFontSizes = (a: ThemeFontSize, b: ThemeFontSize) => {
	const valueA = Number(a.value.split('rem')[0])
	const valueB = Number(b.value.split('rem')[0])
	return (valueA < valueB ? -1 : valueA > valueB ? 1 : 0)
}

const FontSizes = ({
	values = [],
	importedValues = [],
	toggleSelectedImportedValue,
}: {
	values: ThemeFontSize[]
	importedValues: (ThemeFontSize & { imported?: boolean, selected?: boolean })[]
	toggleSelectedImportedValue: (fontSize: ThemeFontSize) => void
}) => {
	const uniqueImportedValues = importedValues.filter(({ value }) => !values.some((v) => v.value === value))
	const sortedUniqueFontSizes = uniqueImportedValues.concat(values as any).sort(sortFontSizes)

	return (
		<Stack
			flexGrow={1}
			marginY="auto"
			overflow="hidden"
		>
			{sortedUniqueFontSizes.map(({ imported, selected, ...props }) => {
				const { value } = props
				const pixelValue = Number(value.split('rem')[0]) * 16
				const alreadySaved = !imported && importedValues.some((v) => v.value === value)

				return (
					<Flex
						invisible
						key={props.id}
						flexShrink={0}
						marginY={2}
						alignItems="stretch"
						as={imported ? Button : undefined}
						onClick={imported ? () => toggleSelectedImportedValue(props) : undefined}
					>
						<Flex
							minWidth="92px"
							minHeight="36px"
							padding={2}
							marginRight={3}
							alignItems="center"
							backgroundColor={selected ? 'Primary Lighter' : imported ? 'Background' : 'transparent'}
							borderRadius="Large"
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
								fontWeight="Demibold"
								color={selected ? 'Primary' : 'Text'}
								paddingRight={2}
							>
								{pixelValue}
							</Text>
						</Flex>
						<FontSize {...props} />
					</Flex>
				)
			})}
		</Stack>
	)
}

export { FontSizes }
