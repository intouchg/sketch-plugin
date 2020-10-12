import React from 'react'
import { Stack } from '@i/components'
import { AccentText, TertiaryButton } from '../components'

const HelpfulResources = () => {
	return (
		<Stack paddingX={1}>
			<AccentText marginBottom={2}>
				Resources
			</AccentText>
			<Stack alignItems="flex-start">
				<TertiaryButton marginBottom={1}>
					Getting Started
				</TertiaryButton>
				<TertiaryButton marginBottom={1}>
					Coming Soon
				</TertiaryButton>
				<TertiaryButton marginBottom={1}>
					Support
				</TertiaryButton>
			</Stack>
		</Stack>
	)
}

export { HelpfulResources }
