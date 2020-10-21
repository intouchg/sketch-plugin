import React from 'react'
import { useSelector } from 'react-redux'
import { Flex, Box } from '@i/components'
import { Color } from '../ThemeValues'
import { InvisibleButton } from '../Buttons'
import type { ThemeColor } from '@i/theme'

const Colors = () => {
	const colors = useSelector((state) => state.theme.values.filter((v) => v.type === 'color')) as ThemeColor[]

	return (
		<Flex
			flexWrap="wrap"
			flexGrow={1}
			marginY="auto"
		>
			{colors.map((color) => (
				<Box
					key={color.id}
					position="relative"
					width="196px"
					height="128px"
					flexGrow={1}
					marginX={2}
					marginBottom={4}
					as={InvisibleButton}
					onClick={() => {}}
				>
					<Color {...color} />
				</Box>
			))}
		</Flex>
	)
}

export { Colors }
