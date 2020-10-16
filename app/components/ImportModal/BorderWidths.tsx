import React, { useState } from 'react'
import { Stack, Box } from '@i/components'
import { BorderWidth } from '../ThemeValues'
import type { ThemeBorderWidth } from '@i/theme'

const BorderWidths = ({
	borderWidths = [],
	routeSelectedImportStyles,
	toggleSelectedImportStyle,
}: {
	borderWidths: (ThemeBorderWidth & { imported?: boolean })[]
	routeSelectedImportStyles: ThemeBorderWidth[]
	toggleSelectedImportStyle: (borderWidth: ThemeBorderWidth) => void
}) => {
	const sortedBorderWidths = borderWidths.slice().sort((a, b) => {
		const valueA = parseInt(a.value.split('px')[0], 10)
		const valueB = parseInt(b.value.split('px')[0], 10)
		return (valueA < valueB ? -1 : valueA > valueB ? 1 : 0)
	})

	return (
		<Stack
			alignItems="center"
			paddingY="146px"
		>
			{sortedBorderWidths.map(({ id, imported, ...props }) => (
				<Box
					key={id}
					borderRadius="Large"
					backgroundColor={imported ? 'Background' : 'transparent'}
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
