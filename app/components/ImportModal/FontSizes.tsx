import React from 'react'
import styled from 'styled-components'
import { Stack, Flex, Box, Text } from '@i/components'
import { FontSize } from '../ThemeValues'
import { SecondaryText } from '../Texts'
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
		const valueA = parseInt(a.value.split('rem')[0], 10)
		const valueB = parseInt(b.value.split('rem')[0], 10)
		return (valueA < valueB ? -1 : valueA > valueB ? 1 : 0)
	})

	return (
		<Stack padding={6}>
			{sortedFontSizes.map(({ imported, selected, ...props }) => {
				const pixelValue = parseInt(props.value.split('rem')[0], 10) * 16

				return (
					<Flex
						key={props.id}
						flexShrink={0}
						marginY={1}
					>
						<Flex
							width="40px"
							minHeight="36px"
							marginRight={3}
							alignItems="center"
							justifyContent="center"
							backgroundColor="Background"
							borderRadius="Large"
							flexShrink={0}
						>
							<SecondaryText>
								{pixelValue}
							</SecondaryText>
						</Flex>
						<FontSize {...props} />
					</Flex>
				)
			})}
		</Stack>
	)
}

export { FontSizes }
