import React from 'react'
import { Stack, Flex } from '@i/components'
import { Shadow } from '../ThemeValues'
import { Checkbox } from '../Checkbox'
import type { ThemeShadow } from '@i/theme'

const sortShadowStyles = (shadowA: ThemeShadow, shadowB: ThemeShadow) => {
	// Parse shadow value into an array [ x, y, blur, spread, color ]
	const a = shadowA.value.split('px').map((s) => parseInt(s, 10))
	const b = shadowB.value.split('px').map((s) => parseInt(s, 10))

	const valueA = a[2] + a[3] + (0.5 * (Math.abs(a[0]) + Math.abs(a[1])))
	const valueB = b[2] + b[3] + (0.5 * (Math.abs(b[0]) + Math.abs(b[1])))
	return valueA < valueB ? -1 : valueA > valueB ? 1 : 0
}

const Shadows = ({
	values = [],
	importedValues = [],
	selectedImportedValues,
	toggleSelectedImportedValue,
}: {
	values: ThemeShadow[]
	importedValues: (ThemeShadow & { imported?: boolean })[]
	selectedImportedValues: ThemeShadow[]
	toggleSelectedImportedValue: (shadow: ThemeShadow) => void
}) => {
	const filteredImportedValues = importedValues.filter(({ value }) => !values.some((v) => v.value === value))
	const sortedShadows = filteredImportedValues.concat(values as any).sort(sortShadowStyles)

	return (
		<Stack
			alignItems="center"
			paddingY="146px"
		>
			{sortedShadows.map(({ id, imported, ...props }, index) => (
				<Shadow
					key={id}
					id={id}
					index={index}
					{...props}
				/>
			))}
		</Stack>
	)
}

export { Shadows }
