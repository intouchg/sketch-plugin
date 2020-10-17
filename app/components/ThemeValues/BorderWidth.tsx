import React, { useState } from 'react'
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
			padding={4}
			paddingRight="0"
		>
			<Text minWidth="48px">
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
