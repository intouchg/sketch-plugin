import React from 'react'
import { Flex } from '@i/components'
import { topToolbarHeight } from '../TopToolbar'

const ValuesContainer = (props: React.ComponentProps<typeof Flex>) => (
	<Flex
		width="100%"
		height={`calc(100vh - ${topToolbarHeight}px)`}
		overflow="scroll"
		{...props}
	/>
)

export { ValuesContainer }
