import React from 'react'
import { Button } from '@i/components'
import { AccentText } from '../Texts'
import { ReactIcon } from '../Icons'
import { useOpenDevServer } from '../../hooks'

const PreviewButton = () => {
	const openDevServer = useOpenDevServer()

	return (
		<Button
			variant="Invisible"
			display="inline-flex"
			marginRight={4}
			paddingY={3}
			onClick={openDevServer}
		>
			<AccentText
				color="Text"
				marginRight={1}
			>
				Preview
			</AccentText>
			<ReactIcon
				width="14px"
				height="13px"
			/>
		</Button>
	)
}

export { PreviewButton }
