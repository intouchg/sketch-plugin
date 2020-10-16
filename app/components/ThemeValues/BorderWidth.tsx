import React, { useState } from 'react'
import { Flex, Box, Text } from '@i/components'
import type { ThemeBorderWidth } from '@i/theme'

const BorderWidth = ({
	id,
	value,
	imported,
	...rest
}: ThemeBorderWidth & { imported?: boolean }) => {
	return (
		<Flex
			width="398px"
			alignItems="center"
			justifyContent="space-around"
			borderRadius="Large"
			backgroundColor="Background"
			paddingX={4}
			paddingY={3}
			marginBottom={2}
		>
			<Text>
				{value}
			</Text>
			<Box
				width="270px"
				height={value}
				backgroundColor="#232323"
			/>
		</Flex>
	)
}

export { BorderWidth }
