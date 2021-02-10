import React from 'react'
import { Stack } from '@i/components'
import { topToolbarHeight } from '../TopToolbar'

export const rightToolbarWidth = '236px'

const RightToolbar = (props: React.ComponentProps<typeof Stack>) => (
	<Stack
		position="relative"
		width={rightToolbarWidth}
		height={`calc(100vh - ${topToolbarHeight})`}
		flexShrink={0}
		padding={3}
		backgroundColor="Card"
		borderLeftWidth="1px"
		borderLeftStyle="solid"
		borderLeftColor="Accent"
		overflow="scroll"
		{...props}
	/>
)

export { RightToolbar }
