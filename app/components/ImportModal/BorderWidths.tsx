import React, { useState } from 'react'
import { Stack, Box } from '@i/components'
import { BorderWidth } from '../ThemeValues'
import type { ThemeBorderWidth } from '@i/theme'

const BorderWidths = ({
	values = [],
	importedValues = [],
	selectedImportedValues,
	toggleSelectedImportedValue,
}: {
	values: ThemeBorderWidth[]
	importedValues: ThemeBorderWidth[]
	selectedImportedValues: ThemeBorderWidth[]
	toggleSelectedImportedValue: (borderWidth: ThemeBorderWidth) => void
}) => {
	const sortedBorderWidths = values.slice().sort((a, b) => {
		const valueA = parseInt(a.value.split('px')[0], 10)
		const valueB = parseInt(b.value.split('px')[0], 10)
		return (valueA < valueB ? -1 : valueA > valueB ? 1 : 0)
	})

	return (
		<Stack
			alignItems="center"
			paddingY="146px"
		>
			{sortedBorderWidths.map(({ id, ...props }) => (
				<Box
					key={id}
					borderRadius="Large"
					backgroundColor="Background"
					marginBottom={2}
				>
					<BorderWidth
						key={id}
						id={id}
						{...props}
					/>
				</Box>
			))}
		</Stack>
	)
}

export { BorderWidths }
