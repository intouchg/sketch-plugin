import React from 'react'
import { Button, Text } from '@intouchg/components'
import { Icon } from '../Icon'
import { useOpenDevServer } from '../../hooks'

const PreviewButton = () => {
	const openDevServer = useOpenDevServer()

	return (
		<Button
			invisible
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
			<Icon
				icon="ReactLogoIcon"
				width="14px"
				height="13px"
			/>
		</Button>
	)
}

export { PreviewButton }
