import React from 'react'
import { Flex } from '@i/components'
import { Color } from '../ThemeValues'
import type { ThemeColor } from '@i/theme'

const Colors = ({
	colors = [],
	routeSelectedImportStyles,
	toggleSelectedImportStyle,
}: {
	colors: (ThemeColor & { imported?: boolean })[]
	routeSelectedImportStyles: ThemeColor[]
	toggleSelectedImportStyle: (color: ThemeColor) => void
}) => {
	return (
		<Flex
			flexWrap="wrap"
			padding={6}
		>
			{colors.map(({ id, name, value }) => (
				<Color
					key={id}
					id={id}
					name={name}
					value={value}
				/>
			))}
		</Flex>
	)
}

export { Colors }
