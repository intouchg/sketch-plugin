import React from 'react'
import { Stack, Flex, InvisibleButton, Box } from '@i/components'
import { Shadow } from '../ThemeValues'
import { ImportIcon } from './ImportIcon'
import type { ThemeShadow } from '@i/theme'

const sortShadows = (a: ThemeShadow, b: ThemeShadow) => {
	// Parse shadow value into an array [ x, y, blur, spread, color ]
	const av = a.value.split('px').map((s) => Number(s))
	const bv = b.value.split('px').map((s) => Number(s))
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
						key={props.id}
						width="100%"
						maxWidth="640px"
						alignItems="center"
						marginBottom={4}
						as={imported ? InvisibleButton : undefined}
						onClick={imported ? () => toggleSelectedImportedValue(props) : undefined}
					>
						<Box
							paddingX={2}
							paddingY={5}
							marginRight={4}
							backgroundColor={selected ? 'Primary Lighter' : imported ? 'Background' : 'transparent'}
							borderRadius="Large"
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
