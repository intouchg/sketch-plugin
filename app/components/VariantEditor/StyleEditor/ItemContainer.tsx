import React from 'react'
import { Flex } from '@i/components'

const ItemContainer = (props: React.ComponentProps<typeof Flex>) => (
	<Flex
		flexShrink={0}
		width="100%"
		alignItems="center"
		justifyContent="space-between"
		paddingX={3}
		marginY={1}
		{...props}
	/>
)

export { ItemContainer }
