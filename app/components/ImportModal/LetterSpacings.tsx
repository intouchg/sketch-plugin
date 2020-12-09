import React from 'react'
import { Stack, Flex, Text } from '@i/components'
import { LetterSpacing } from '../ThemeValues'
import { Checkbox, CheckboxPlaceholder } from '../Checkbox'
import { InvisibleButton } from '../Buttons'
import type { ThemeLetterSpacing } from '@i/theme'

const sortLetterSpacings = (a: ThemeLetterSpacing, b: ThemeLetterSpacing) => {
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
			{sortedUniqueLetterSpacings.map(({ imported, selected, ...props }) => (
				<Flex
					key={props.id}
					flexShrink={0}
					marginY={2}
					alignItems="center"
					as={imported ? InvisibleButton : undefined}
					onClick={imported ? () => toggleSelectedImportedValue(props) : undefined}
				>
					<Flex
						minWidth="72px"
						minHeight="36px"
						marginRight={3}
						alignItems="center"
						backgroundColor={selected ? 'Positive Light' : imported ? 'Background' : 'transparent'}
						borderRadius="Large"
						flexShrink={0}
					>
						{imported ? (
							<Checkbox
								checked={Boolean(selected)}
								padding={2}
							/>
						) : (
							<CheckboxPlaceholder padding={2} />
						)}
						<Text paddingRight={2}>
							{props.value.split('px')[0]}
						</Text>
					</Flex>
					<LetterSpacing {...props} />
				</Flex>
			))}
		</Stack>
	)
}

export { LetterSpacings }
