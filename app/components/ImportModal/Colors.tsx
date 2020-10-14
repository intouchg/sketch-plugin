import React, { useState } from 'react'
import { Flex, Box, Text } from '@i/components'
import { ColorSwatch } from '../ColorSwatch'
import type { ThemeColor } from '@i/theme'

const Colors = ({
	colors = [],
}: {
	colors: (ThemeColor & { imported?: boolean })[]
}) => {
	return (
		<Flex
			flexWrap="wrap"
			padding={6}
		>
			{colors.map(({ id, name, value }) => (
				<ColorSwatch
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
