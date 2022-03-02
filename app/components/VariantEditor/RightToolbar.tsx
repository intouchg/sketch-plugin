import React from 'react'
import { Stack } from '@intouchg/components'
import { topToolbarHeight } from '../TopToolbar'

export const rightToolbarWidth = 280

const RightToolbar = (props: React.ComponentProps<typeof Stack>) => (
	<Stack
		position="relative"
		width={rightToolbarWidth}
		height={`calc(100vh - ${topToolbarHeight}px)`}
		flexShrink={0}
		backgroundColor="Card"
		borderLeftWidth="1px"
		borderLeftStyle="solid"
		borderLeftColor="Accent"
		overflow="scroll"
		{...props}
	/>
)

export { RightToolbar }
