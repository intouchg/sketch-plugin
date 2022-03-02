import React from 'react'
import { Stack, Flex, Button, Box, Text } from '@intouchg/components'
import { BorderWidth } from '../ThemeValues'
import { ImportIcon } from './ImportIcon'
import type { ThemeBorderWidth } from '@intouchg/theme'

export const sortBorderWidths = (a: ThemeBorderWidth, b: ThemeBorderWidth) => {
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
	const uniqueImportedValues = importedValues.filter(({ value }) => !values.some((v) => v.value === value))
	const sortedUniqueBorderWidths = uniqueImportedValues.concat(values as any).sort(sortBorderWidths)

	return (
		<Stack
			alignItems="center"
			flexGrow={1}
			marginY="auto"
		>
			{sortedUniqueBorderWidths.map(({ imported, selected, ...props }) => {
				const { value } = props
				const alreadySaved = !imported && importedValues.some((v) => v.value === value)

				return (
					<Flex
						invisible
						key={props.id}
						width="100%"
						maxWidth="640px"
						alignItems="center"
						marginBottom={4}
						as={imported ? Button : undefined}
						onClick={imported ? () => toggleSelectedImportedValue(props) : undefined}
					>
						<Flex
							alignItems="center"
							justifyContent="space-around"
							flexGrow={1}
						>
							<Flex
								minWidth="92px"
								minHeight="44px"
								flexShrink={0}
								padding={2}
								marginRight={3}
								alignItems="center"
								backgroundColor={selected ? 'Primary Lighter' : imported ? 'Background' : 'transparent'}
								borderRadius={3}
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
									{props.value.split('px')[0]}
								</Text>
							</Flex>
							<BorderWidth {...props} />
						</Flex>
					</Flex>
				)
			})}
		</Stack>
	)
}

export { BorderWidths }
