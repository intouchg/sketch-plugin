import React, { useState } from 'react'
import { Stack } from '@i/components'
import { BorderWidth } from '../ThemeValues'
import type { ThemeBorderWidth } from '@i/theme'

const Borders = ({
	borderWidths = [],
}: {
	borderWidths: (ThemeBorderWidth & { imported?: boolean })[]
}) => {
	return (
		<Stack
			alignItems="center"
			paddingY="146px"
		>
			{borderWidths.map(({ id, ...props }) => (
				<BorderWidth
					key={id}
					id={id}
					{...props}
				/>
			))}
		</Stack>
	)
}

export { Borders }
