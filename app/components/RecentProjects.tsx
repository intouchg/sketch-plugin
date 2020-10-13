import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Stack, Text, Box } from '@i/components'
import { AccentText, TertiaryButton } from '../components'
import { sketchRequest } from '../sketchApi'

const selectRecentProject = (filepath: string) => sketchRequest('selectLocalProject', { filepath })

const TruncatedTextBox = styled(Box)`
	max-width: 320px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`

const RecentProject = ({
	name,
	filepath,
}: {
	name?: string
	filepath: string
}) => {
	const selectProject = () => selectRecentProject(filepath)

	return (
		<Stack
			as={TertiaryButton}
			maxWidth="320px"
			overflow="hidden"
			textOverflow="ellipsis"
			marginBottom={1}
			onClick={selectProject}
		>
			<TruncatedTextBox>
				{name}
			</TruncatedTextBox>
			<Text
				variant="Accent Small"
				as={TruncatedTextBox}
			>
				{filepath}
			</Text>
		</Stack>
	)
}

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
				{formattedRecentProjects.map((props) => (
					<RecentProject
						key={props.filepath}
						{...props}
					/>
				))}
			</Stack>
		</Stack>
	)
}

export { RecentProjects }