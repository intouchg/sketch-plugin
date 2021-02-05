import React from 'react'
import { Stack, Flex, Button, Box } from '@i/components'
import { BorderWidth } from '../ThemeValues'
import { ImportIcon } from './ImportIcon'
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
						maxWidth="540px"
						padding={3}
						alignItems="center"
						marginBottom={4}
						backgroundColor={selected ? 'Primary Lighter' : imported ? 'Background' : 'transparent'}
						borderRadius="Large"
						as={imported ? Button : undefined}
						onClick={imported ? () => toggleSelectedImportedValue(props) : undefined}
					>
						<Box marginRight={2}>
							<ImportIcon
								imported={imported}
								selected={selected}
								alreadySaved={alreadySaved}
							/>
						</Box>
						<BorderWidth {...props} />
					</Flex>
				)
			})}
		</Stack>
	)
}

export { BorderWidths }
