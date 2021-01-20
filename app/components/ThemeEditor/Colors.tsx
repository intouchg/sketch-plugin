import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@i/components'
import { Color } from '../ThemeValues'
import { InvisibleButton } from '../Buttons'
import { ColorGrid } from '../ColorGrid'
import { topToolbarHeight } from '../TopToolbar'

const Colors = () => {
	const colors = useSelector((state) => state.theme.values.colors)

	return (
		<Box
			width="100%"
			height={`calc(100vh - ${topToolbarHeight})`}
			overflow="scroll"
		>
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
		</Box>
	)
}

export { Colors }
