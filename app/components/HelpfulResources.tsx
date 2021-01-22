import React from 'react'
import { Stack, Button } from '@i/components'
import { AccentText } from './Texts'
import { openBrowserWindow } from '../sketchApi'

const HelpfulResources = () => {
	return (
		<Stack paddingX={1}>
			<AccentText marginBottom={2}>
				Resources
			</AccentText>
			<Stack alignItems="flex-start">
				<Button
					variant="Tertiary"
					marginBottom={1}
					onClick={() => openBrowserWindow('https://google.com')}
				>
					Getting Started
				</Button>
				<Button
					variant="Tertiary"
					marginBottom={1}
					onClick={() => openBrowserWindow('https://google.com')}
				>
					Coming Soon
				</Button>
				<Button
					variant="Tertiary"
					marginBottom={1}
					onClick={() => openBrowserWindow('https://google.com')}
				>
					Support
				</Button>
			</Stack>
		</Stack>
	)
}

export { HelpfulResources }
