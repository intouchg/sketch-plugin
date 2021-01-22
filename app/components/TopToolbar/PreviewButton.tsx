import React from 'react'
import { InvisibleButton, Text } from '@i/components'
import { ReactIcon } from '../Icons'
import { useOpenDevServer } from '../../hooks'

const PreviewButton = () => {
	const openDevServer = useOpenDevServer()

	return (
		<InvisibleButton
			display="inline-flex"
			marginRight={4}
			paddingY={3}
			onClick={openDevServer}
		>
			<Text
				variant="Accent"
				color="Text"
				marginRight={1}
			>
				Preview
			</Text>
			<ReactIcon
				width="14px"
				height="13px"
			/>
		</InvisibleButton>
	)
}

export { PreviewButton }
