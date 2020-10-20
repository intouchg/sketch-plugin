import React from 'react'
import { Flex, Box, Text } from '@i/components'
import type { ThemeBorderWidth } from '@i/theme'

const BorderWidth = ({
	value,
	...props
}: ThemeBorderWidth) => {
	return (
		<Flex
			alignItems="center"
			justifyContent="space-around"
			flexGrow={1}
		>
			<Text
				minWidth="48px"
				textAlign="left"
			>
				{value}
			</Text>
			<Box
				flexGrow={1}
				height={value}
				marginLeft={4}
				backgroundColor="#232323"
			/>
		</Flex>
	)
}

export { BorderWidth }
