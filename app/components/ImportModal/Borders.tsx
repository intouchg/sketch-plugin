import React, { useState } from 'react'
import { Stack, Box } from '@i/components'
import { BorderWidth } from '../ThemeValues'
import type { ThemeBorderWidth } from '@i/theme'

const Borders = ({
	borderWidths = [],
}: {
	borderWidths: (ThemeBorderWidth & { imported?: boolean })[]
}) => {
	// const sortedBorderWidths = borderWidths.slice().sort((a, b) => {
	// 	const valueA = a.value.split('px')[0]
	// })

	return (
		<Stack
			alignItems="center"
			paddingY="146px"
		>
			{borderWidths.map(({ id, imported, ...props }) => (
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

export { Borders }
