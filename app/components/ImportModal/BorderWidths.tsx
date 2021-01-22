import React from 'react'
import styled from 'styled-components'
import { Stack, Flex, InvisibleButton } from '@i/components'
import { BorderWidth } from '../ThemeValues'
import { Checkbox, CheckboxPlaceholder } from '../Checkbox'
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
						key={props.id}
						width="100%"
						maxWidth="540px"
						padding={3}
						alignItems="center"
						marginBottom={4}
						backgroundColor={selected ? 'Positive Light' : imported ? 'Background' : 'transparent'}
						borderRadius="Large"
						as={imported ? InvisibleButton : undefined}
						onClick={imported ? () => toggleSelectedImportedValue(props) : undefined}
					>
						{imported ? (
							<Checkbox
								checked={Boolean(selected)}
								marginRight={3}
							/>
						) : alreadySaved ? (
							<Checkbox
								checked
								disabled
								marginRight={3}
							/>
						) : (
							<CheckboxPlaceholder marginRight={3} />
						)}
						<BorderWidth {...props} />
					</Flex>
				)
			})}
		</Stack>
	)
}

export { BorderWidths }
