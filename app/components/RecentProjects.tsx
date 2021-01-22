import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Stack, Text, Box, Button } from '@i/components'
import { useSelectLocalProject } from '../hooks'

const OverflowButton = styled(Button).attrs({ variant: 'Tertiary' })`
	display: flex;
	flex-direction: column;
	max-width: 320px;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-bottom: ${({ theme }) => theme.space[1]};
`

const TruncatedTextBox = styled(Box)`
	max-width: 320px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`

const DirectoryFilepath = ({
	name,
	filepath,
}: {
	name?: string
	filepath: string
}) => {
	const selectRecentProject = useSelectLocalProject(filepath)

	return (
		<OverflowButton onClick={selectRecentProject}>
			<TruncatedTextBox>
				{name}
			</TruncatedTextBox>
			<Text
				variant="Accent Small"
				as={TruncatedTextBox}
			>
				{filepath}
			</Text>
		</OverflowButton>
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
			<Text
				variant="Accent"
				marginBottom={2}
			>
				Recent
			</Text>
			<Stack alignItems="flex-start">
				{formattedRecentProjects.map((props) => (
					<DirectoryFilepath
						key={props.filepath}
						{...props}
					/>
				))}
			</Stack>
		</Stack>
	)
}

export { RecentProjects }
