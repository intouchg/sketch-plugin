import React from 'react'
import { useParams } from 'react-router'
import { Flex } from '@i/components'
import { RightToolbar } from './RightToolbar'
import { topToolbarHeight } from '../TopToolbar'

const Editor = () => {
	const { componentName } = useParams()

	return (
		<>
			<Flex
				width="100%"
				height={`calc(100vh - ${topToolbarHeight}px)`}
				overflow="scroll"
			>
				Test
			</Flex>
			<RightToolbar>
				Test
			</RightToolbar>
		</>
	)
}

export { Editor }
