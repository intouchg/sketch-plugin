import React from 'react'
import { Stack, Flex, Text } from '@i/components'
import { FontSize } from '../ThemeValues'
import { Checkbox, CheckboxPlaceholder } from '../Checkbox'
import { InvisibleButton } from '../Buttons'
import type { ThemeFontSize } from '@i/theme'

const FontSizes = ({
	values = [],
	importedValues = [],
	toggleSelectedImportedValue,
}: {
	values: ThemeFontSize[]
	importedValues: (ThemeFontSize & { imported?: boolean, selected?: boolean })[]
	toggleSelectedImportedValue: (fontSize: ThemeFontSize) => void
}) => {
	const filteredImportedValues = importedValues.filter(({ value }) => !values.some((v) => v.value === value))
	const sortedFontSizes = filteredImportedValues.concat(values as any).sort((a, b) => {
		const valueA = Number(a.value.split('rem')[0])
		const valueB = Number(b.value.split('rem')[0])
		return (valueA < valueB ? -1 : valueA > valueB ? 1 : 0)
	})

	return (
		<Stack>
			{sortedFontSizes.map(({ imported, selected, ...props }) => {
				const pixelValue = Number(props.value.split('rem')[0]) * 16

				return (
					<Flex
						key={props.id}
						flexShrink={0}
						marginY={1}
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
