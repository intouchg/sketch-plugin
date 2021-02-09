import React from 'react'
import { Stack } from '@i/components'
import { topToolbarHeight } from '../TopToolbar'

const RightToolbar = (props: React.ComponentProps<typeof Stack>) => (
	<Stack
		width="236px"
		height={`calc(100vh - ${topToolbarHeight})`}
		flexShrink={0}
		padding={3}
		backgroundColor="Card"
		overflow="scroll"
		{...props}
	/>
)

export { RightToolbar }
