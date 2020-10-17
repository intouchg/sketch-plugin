import React from 'react'
import { Stack, Flex } from '@i/components'
import { Shadow } from '../ThemeValues'
import { Checkbox } from '../Checkbox'
import { InvisibleButton } from '../Buttons'
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
	toggleSelectedImportedValue,
}: {
	values: ThemeShadow[]
	importedValues: (ThemeShadow & { imported?: boolean, selected?: boolean })[]
	toggleSelectedImportedValue: (shadow: ThemeShadow) => void
}) => {
	const filteredImportedValues = importedValues.filter(({ value }) => !values.some((v) => v.value === value))
	const sortedShadows = filteredImportedValues.concat(values as any).sort(sortShadowStyles)

	return (
		<Stack
			width="460px"
			alignItems="flex-end"
			margin="0 auto"
			paddingY="146px"
		>
			{sortedShadows.map(({ imported, selected, ...props }, index) => (
				<Flex
					key={props.id}
					alignItems="center"
					marginBottom={4}
					as={imported ? InvisibleButton : undefined}
					onClick={imported ? () => toggleSelectedImportedValue(props) : undefined}
				>
					{imported && (
						<Checkbox
							checked={Boolean(selected)}
							marginRight={3}
						/>
					)}
					<Shadow
						index={index}
						{...props}
					/>
				</Flex>
			))}
		</Stack>
	)
}

export { Shadows }
