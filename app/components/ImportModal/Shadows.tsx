import React, { useState } from 'react'
import { Stack } from '@i/components'
import { Shadow } from '../ThemeValues'
import type { ThemeShadow } from '@i/theme'

const Shadows = ({
	shadows = [],
	routeSelectedImportStyles,
	toggleSelectedImportStyle,
}: {
	shadows: (ThemeShadow & { imported?: boolean })[]
	routeSelectedImportStyles: ThemeShadow[]
	toggleSelectedImportStyle: (shadow: ThemeShadow) => void
}) => {
	return (
		<Stack
			alignItems="center"
			paddingY="146px"
		>
			{shadows.map(({ id, ...rest }, index) => (
				<Shadow
					key={id}
					id={id}
					index={index}
					{...rest}
				/>
			))}
		</Stack>
	)
}

export { Shadows }
