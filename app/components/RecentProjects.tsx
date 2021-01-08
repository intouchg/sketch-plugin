import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Stack, Text, Box } from '@i/components'
import { TertiaryButton } from './Buttons'
import { AccentText } from './Texts'
import { useSelectLocalProject } from '../hooks'

const TruncatedTextBox = styled(Box)`
	max-width: 320px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`

const RecentProject = ({
	name,
	filepath,
	setShowLoadingUpdates,
}: {
	name?: string
	filepath: string
	setShowLoadingUpdates: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const selectRecentProject = useSelectLocalProject(setShowLoadingUpdates, filepath)

	return (
		<Stack
			as={TertiaryButton}
			maxWidth="320px"
			overflow="hidden"
			textOverflow="ellipsis"
			marginBottom={1}
			onClick={selectRecentProject}
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

const RecentProjects = ({
	setShowLoadingUpdates,
}: {
	setShowLoadingUpdates: React.Dispatch<React.SetStateAction<boolean>>
}) => {
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
						setShowLoadingUpdates={setShowLoadingUpdates}
					/>
				))}
			</Stack>
		</Stack>
	)
}

export { RecentProjects }
