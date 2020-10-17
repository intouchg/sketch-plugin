import React, { useState } from 'react'
import { Flex, Box, Text } from '@i/components'
import type { ThemeBorderWidth } from '@i/theme'

const BorderWidth = ({
	id,
	value,
	...props
}: ThemeBorderWidth) => {
	return (
		<Flex
			width="420px"
			alignItems="center"
			justifyContent="space-around"
			padding={4}
		>
			<Text>
				{value}
			</Text>
			<Box
				width="300px"
				height={value}
				backgroundColor="#232323"
			/>
		</Flex>
	)
}

export { BorderWidth }
