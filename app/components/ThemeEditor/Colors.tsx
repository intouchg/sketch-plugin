import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Button } from '@i/components'
import { Color } from '../ThemeValues'
import { ColorGrid } from '../ColorGrid'
import { topToolbarHeight } from '../TopToolbar'

const Colors = () => {
	const colors = useSelector((state) => state.theme.values.colors)

	return (
		<Box
			display="flex"
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
					<Button
						key={color.id}
						variant="Invisible"
						position="relative"
						height="0"
						paddingBottom="65.31%"
						flexGrow={1}
						onClick={() => {}}
					>
						<Color
							selected={false}
							{...color}
						/>
					</Button>
				))}
			</ColorGrid>
		</Box>
	)
}

export { Colors }
