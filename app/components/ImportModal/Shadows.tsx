import React from 'react'
import { Stack, Flex, Button, Box } from '@intouchg/components'
import { Shadow } from '../ThemeValues'
import { ImportIcon } from './ImportIcon'
import type { ThemeShadow } from '@intouchg/theme'

export const sortShadows = (a: ThemeShadow, b: ThemeShadow) => {
	let shadowA = a.value
	let shadowB = b.value

	if (shadowA.includes('inset') && !shadowB.includes('inset')) {
		return -1
	}

	if (shadowB.includes('inset') && !shadowA.includes('inset')) {
		return 1
	}

	if (shadowA.includes('inset') && shadowB.includes('inset')) {
		shadowA = shadowA.replace('inset ', '')
		shadowB = shadowB.replace('inset ', '')
	}

	// Parse shadow value into an array [ x, y, blur, spread, color ]
	const av = shadowA.split('px').map((s) => Number(s))
	const bv = shadowB.split('px').map((s) => Number(s))
	const valueA = av[2] + av[3] + (0.5 * (Math.abs(av[0]) + Math.abs(av[1])))
	const valueB = bv[2] + bv[3] + (0.5 * (Math.abs(bv[0]) + Math.abs(bv[1])))
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
	const uniqueImportedValues = importedValues.filter(({ value }) => !values.some((v) => v.value === value))
	const sortedUniqueShadows = uniqueImportedValues.concat(values as any).sort(sortShadows)

	return (
		<Stack
			alignItems="center"
			flexGrow={1}
			marginY="auto"
		>
			{sortedUniqueShadows.map(({ imported, selected, ...props }) => {
				const { value } = props
				const alreadySaved = !imported && importedValues.some((v) => v.value === value)

				return (
					<Flex
						invisible
						key={props.id}
						width="100%"
						maxWidth="580px"
						alignItems="center"
						paddingY={5}
						as={imported ? Button : undefined}
						onClick={imported ? () => toggleSelectedImportedValue(props) : undefined}
					>
						<Box
							padding={3}
							marginRight={6}
							backgroundColor={selected ? 'Primary Lighter' : imported ? 'Background' : 'transparent'}
							borderRadius={3}
						>
							<ImportIcon
								imported={imported}
								selected={selected}
								alreadySaved={alreadySaved}
							/>
						</Box>
						<Shadow {...props} />
					</Flex>
				)
			})}
		</Stack>
	)
}

export { Shadows }
