import React from 'react'
import { Stack } from '@i/components'
import { TertiaryButton } from '../Buttons'
import { AccentText } from '../Texts'
import { sketchRequest } from '../../sketchApi'

const openBrowserWindow = (url: string) => sketchRequest('openBrowserWindow', url)

const HelpfulResources = () => {
	return (
		<Stack paddingX={1}>
			<AccentText marginBottom={2}>
				Resources
			</AccentText>
			<Stack alignItems="flex-start">
				<TertiaryButton
					marginBottom={1}
					onClick={() => openBrowserWindow('https://google.com')}
				>
					Getting Started
				</TertiaryButton>
				<TertiaryButton
					marginBottom={1}
					onClick={() => openBrowserWindow('https://google.com')}
				>
					Coming Soon
				</TertiaryButton>
				<TertiaryButton
					marginBottom={1}
					onClick={() => openBrowserWindow('https://google.com')}
				>
					Support
				</TertiaryButton>
			</Stack>
		</Stack>
	)
}

export { HelpfulResources }
