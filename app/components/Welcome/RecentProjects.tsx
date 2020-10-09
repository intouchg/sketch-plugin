import React from 'react'
import { Stack } from '@i/components'
import { AccentText, TertiaryButton } from '../../components'

const RecentProjects = () => {
	return (
		<Stack paddingX={1}>
			<AccentText marginBottom={2}>
				Recent
			</AccentText>
			<Stack alignItems="flex-start">
				<TertiaryButton marginBottom={1}>
					IDS Plugin
				</TertiaryButton>
				<TertiaryButton marginBottom={1}>
					Exec Demo
				</TertiaryButton>
				<TertiaryButton marginBottom={1}>
					More...
				</TertiaryButton>
			</Stack>
		</Stack>
	)
}

export { RecentProjects }
