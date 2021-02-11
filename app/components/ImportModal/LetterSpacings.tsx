import React from 'react'
import { Stack, Flex, Text, Button, Box } from '@i/components'
import { LetterSpacing } from '../ThemeValues'
import { ImportIcon } from './ImportIcon'
import type { ThemeLetterSpacing } from '@i/theme'

export const sortLetterSpacings = (a: ThemeLetterSpacing, b: ThemeLetterSpacing) => {
	const valueA = Number(a.value.split('px')[0])
	const valueB = Number(b.value.split('px')[0])
	return (valueA < valueB ? -1 : valueA > valueB ? 1 : 0)
}

const LetterSpacings = ({
	values = [],
	importedValues = [],
	toggleSelectedImportedValue,
}: {
	values: ThemeLetterSpacing[]
	importedValues: (ThemeLetterSpacing & { imported?: boolean, selected?: boolean })[]
	toggleSelectedImportedValue: (fontSize: ThemeLetterSpacing) => void
}) => {
	const uniqueImportedValues = importedValues.filter(({ value }) => !values.some((v) => v.value === value))
	const sortedUniqueLetterSpacings = uniqueImportedValues.concat(values as any).sort(sortLetterSpacings)

	return (
		<Stack
			maxWidth="100%"
			marginY="auto"
		>
			{sortedUniqueLetterSpacings.map(({ imported, selected, ...props }) => {
				const { value } = props
				const alreadySaved = !imported && importedValues.some((v) => v.value === value)

				return (
					<Flex
						invisible
						key={props.id}
						flexShrink={0}
						marginY={3}
						alignItems="center"
						as={imported ? Button : undefined}
						onClick={imported ? () => toggleSelectedImportedValue(props) : undefined}
					>
						<Flex
							minWidth="92px"
							minHeight="44px"
							padding={2}
							marginRight={3}
							alignItems="center"
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
								fontWeight={3}
								color={selected ? 'Primary' : 'Text'}
								paddingRight={2}
							>
								{value.split('px')[0]}
							</Text>
						</Flex>
						<LetterSpacing {...props} />
					</Flex>
				)
			})}
		</Stack>
	)
}

export { LetterSpacings }
