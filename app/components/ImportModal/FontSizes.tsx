import React from 'react'
import { Stack, Flex, Text } from '@i/components'
import { FontSize } from '../ThemeValues'
import { Checkbox, CheckboxPlaceholder } from '../Checkbox'
import { InvisibleButton } from '../Buttons'
import type { ThemeFontSize } from '@i/theme'

const sortFontSizes = (a: ThemeFontSize, b: ThemeFontSize) => {
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
						key={props.id}
						flexShrink={0}
						marginY={2}
						alignItems="stretch"
						as={imported ? InvisibleButton : undefined}
						onClick={imported ? () => toggleSelectedImportedValue(props) : undefined}
					>
						<Flex
							minWidth="72px"
							minHeight="36px"
							marginRight={3}
							alignItems="center"
							justifyContent="center"
							backgroundColor={selected ? 'Positive Light' : imported ? 'Background' : 'transparent'}
							borderRadius="Large"
							flexShrink={0}
						>
							{imported ? (
								<Checkbox
									checked={Boolean(selected)}
									padding={2}
								/>
							) : alreadySaved ? (
								<Checkbox
									checked
									disabled
									padding={2}
								/>
							) : (
								<CheckboxPlaceholder padding={2} />
							)}
							<Text paddingRight={2}>
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
