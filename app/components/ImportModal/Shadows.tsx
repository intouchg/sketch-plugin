import React, { useState } from 'react'
import { Stack } from '@i/components'
import { Shadow } from '../ThemeValues'
import type { ThemeShadow } from '@i/theme'

const Shadows = ({
	values = [],
	importedValues = [],
	selectedImportedValues,
	toggleSelectedImportedValue,
}: {
	values: ThemeShadow[]
	importedValues: ThemeShadow[]
	selectedImportedValues: ThemeShadow[]
	toggleSelectedImportedValue: (shadow: ThemeShadow) => void
}) => {
	return (
		<Stack
			alignItems="center"
			paddingY="146px"
		>
			{values.map(({ id, ...rest }, index) => (
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
