import React from 'react'
import { useSelector } from 'react-redux'
import { Stack, Text, Box } from '@i/components'
import { AccentText, TertiaryButton } from '../../components'
import { sketchRequest } from '../../sketchApi'

const selectRecentProject = (filepath: string) => sketchRequest('selectLocalProject', { filepath })

const RecentProjects = () => {
	const recentProjects = useSelector((state) => state.theme.recentProjects)

	const formattedRecentProjects = recentProjects.map(({ filepath }) => ({
		name: filepath.split('/').pop(),
		filepath,
	}))

	return (
		<Stack paddingX={1}>
			<AccentText marginBottom={2}>
				Recent
			</AccentText>
			<Stack alignItems="flex-start">
				{formattedRecentProjects.map(({ name, filepath }) => (
					<TertiaryButton
						key={filepath}
						marginBottom={1}
						overflow="hidden"
						onClick={() => selectRecentProject(filepath)}
					>
						{name}
						{/* <Text variant="Accent Small">
							{filepath}
						</Text> */}
					</TertiaryButton>
				))}
			</Stack>
		</Stack>
	)
}

export { RecentProjects }
