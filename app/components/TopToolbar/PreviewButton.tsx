import React from 'react'
import { InvisibleButton } from '../Buttons'
import { AccentText } from '../Texts'
import { ReactIcon } from '../Icons'
import { sketchRequest } from '../../sketchApi'

const openDevServer = () => sketchRequest('openDevServer')

const PreviewButton = () => (
	<InvisibleButton
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
	</InvisibleButton>
)

export { PreviewButton }