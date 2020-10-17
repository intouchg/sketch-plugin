import React from 'react'
import { Flex, Box } from '@i/components'
import { Color } from '../ThemeValues'
import { Checkbox } from '../Checkbox'
import { OverwriteIcon } from '../Icons'
import { InvisibleButton } from '../Buttons'
import { sortAlphabetical } from '@i/utility'
import type { ThemeColor } from '@i/theme'

const Colors = ({
	values = [],
	importedValues = [],
	toggleSelectedImportedValue,
}: {
	values: ThemeColor[]
	importedValues: (ThemeColor & { imported?: boolean, selected?: boolean })[]
	toggleSelectedImportedValue: (color: ThemeColor & { willOverwrite?: boolean }) => void
}) => {
	const filteredThemeValues = values.filter(({ name }) => !importedValues.some((v) => v.name === name))

	const sortedColors = importedValues
		.map((i) => ({ ...i, willOverwrite: values.some((v) => v.name === i.name) }))
		.concat(filteredThemeValues as any)
		.sort((a, b) => sortAlphabetical(a, b, 'name'))

	return (
		<Flex
			flexWrap="wrap"
			padding={6}
		>
			{sortedColors.map(({ imported, selected, willOverwrite, ...props }) => (
				<Box
					key={props.id}
					position="relative"
					width="196px"
					height="128px"
					flexGrow={1}
					marginX={2}
					marginBottom={4}
					as={imported ? InvisibleButton : undefined}
					onClick={imported ? () => toggleSelectedImportedValue({ ...props, willOverwrite }) : undefined}
				>
					<Color {...props} />
					{imported && (
						<Checkbox
							position="absolute"
							top="0"
							right="0"
							margin={2}
							checked={Boolean(selected)}
						/>
					)}
					{imported && willOverwrite && (
						<Flex
							position="absolute"
							bottom="0"
							right="0"
							alignItems="center"
							justifyContent="center"
							width="20px"
							height="20px"
							margin={2}
							backgroundColor="Card"
							borderRadius="50%"
						>
							<OverwriteIcon
								width="16px"
								height="16px"
								fill="Caution Dark"
							/>
						</Flex>
					)}
				</Box>
			))}
		</Flex>
	)
}

export { Colors }
