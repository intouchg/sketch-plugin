import React from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Stack, Heading, Text, Button } from '@i/components'
import { useSelectLocalProject } from '../../hooks'
import { setShowReposModal } from '../../store'
import type { AzureGitRepo } from '@i/azure'

const CloneSuccess = ({
	repo,
	directory,
}: {
    repo: AzureGitRepo
    directory: string
}) => {
	const dispatch = useDispatch()
	const selectLocalProject = useSelectLocalProject(directory)

	const openProject = () => {
		dispatch(setShowReposModal(false))
		selectLocalProject()
	}

	return (
		<Flex
			alignItems="center"
			justifyContent="center"
			width="100%"
			padding={3}
			backgroundColor="Background"
		>
			<Stack
				width="100%"
				maxWidth="560px"
			>
				<Heading marginBottom={5}>
					{repo.name}
				</Heading>
				<Stack marginBottom={6}>
					<Text>
						The project was downloaded successfully. Open it to get started.
					</Text>
				</Stack>
				<Flex justifyContent="flex-end">
					<Button onClick={openProject}>
						Open Project
					</Button>
				</Flex>
			</Stack>
		</Flex>
	)
}

export { CloneSuccess }
