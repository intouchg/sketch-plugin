import React, { useState } from 'react'
import { Flex } from '@i/components'
import { Color } from '../ThemeValues'
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
