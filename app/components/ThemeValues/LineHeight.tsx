import React from 'react'
import { Text, Flex } from '@i/components'
import { SecondaryText } from '../Texts'
import type { ThemeLineHeight } from '@i/theme'

const LineHeight = ({
	value,
	...props
}: ThemeLineHeight) => {
	return (
		<Flex
			alignItems="center"
			justifyContent="space-around"
		>
			<Flex
				alignItems="center"
				justifyContent="center"
				minWidth="85px"
				minHeight="88px"
				marginRight={5}
				borderRadius="Large"
			>
				<SecondaryText
					color="Primary"
					fontWeight="Demibold"
				>
					{value}
				</SecondaryText>
			</Flex>
			<Text
				width="100%"
				lineHeight={value}
			>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non numquam
				eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
				voluptatem. Nisi ut aliquid ex ea commodi consequatur.
			</Text>
		</Flex>
	)
}

export { LineHeight }
