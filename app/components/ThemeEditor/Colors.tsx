import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@i/components'
import { Color } from '../ThemeValues'
import { InvisibleButton } from '../Buttons'
import { ColorGrid } from '../ColorGrid'
import type { ThemeColor } from '@i/theme'

const Colors = () => {
	const colors = useSelector((state) => state.theme.values.filter((v) => v.type === 'color')) as ThemeColor[]

	return (
		<ColorGrid
			maxWidth="860px"
			marginX="auto"
			gridGap={3}
			padding={6}
		>
			{colors.map((color) => (
				<Box
					key={color.id}
					position="relative"
					height="0"
					paddingBottom="65.31%"
					flexGrow={1}
					as={InvisibleButton}
					onClick={() => {}}
				>
					<Color
						selected={false}
						{...color}
					/>
				</Box>
			))}
		</ColorGrid>
	)
}

export { Colors }
