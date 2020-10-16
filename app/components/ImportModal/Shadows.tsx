import React, { useState } from 'react'
import { Stack } from '@i/components'
import { Shadow } from '../ThemeValues'
import type { ThemeShadow } from '@i/theme'

const Shadows = ({
	shadows = [],
}: {
	shadows: (ThemeShadow & { imported?: boolean })[]
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
