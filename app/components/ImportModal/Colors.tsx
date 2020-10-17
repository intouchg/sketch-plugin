import React from 'react'
import { Flex, Box, Label } from '@i/components'
import { Color } from '../ThemeValues'
import { Checkbox } from '../Checkbox'
import { sortAlphabetical } from '@i/utility'
import type { ThemeColor } from '@i/theme'

const Colors = ({
	values = [],
	importedValues = [],
	toggleSelectedImportedValue,
}: {
	values: ThemeColor[]
	importedValues: (ThemeColor & { imported?: boolean, selected?: boolean })[]
	toggleSelectedImportedValue: (color: ThemeColor) => void
}) => {
	const filteredThemeValues = values.filter(({ name }) => !importedValues.some((v) => v.name === name))
	const sortedColors = importedValues.concat(filteredThemeValues as any).sort((a, b) => sortAlphabetical(a, b, 'name'))

	return (
		<Flex
			flexWrap="wrap"
			padding={6}
		>
			{sortedColors.map(({ imported, selected, ...props }) => (
				<Box
					key={props.id}
					as={imported ? Label : undefined}
					position="relative"
					width="196px"
					height="128px"
					flexGrow={1}
					marginX={2}
					marginBottom={4}
				>
					<Color {...props} />
					{imported && (
						<Checkbox
							position="absolute"
							top="0"
							right="0"
							margin={2}
							checked={Boolean(selected)}
							onClick={() => toggleSelectedImportedValue(props)}
						/>
					)}
				</Box>
			))}
		</Flex>
	)
}

export { Colors }
