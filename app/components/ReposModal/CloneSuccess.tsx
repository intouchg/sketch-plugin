import React from 'react'
import { Flex, Stack, Heading, Text, Button } from '@i/components'
import { useSelectLocalProject } from '../../hooks'
import type { AzureGitRepo } from '@i/azure'

const CloneSuccess = ({
	repo,
	directory,
}: {
    repo: AzureGitRepo
    directory: string
}) => {
	const selectLocalProject = useSelectLocalProject(directory)

	return (
		<Flex
			alignItems="center"
			justifyContent="center"
			width="100%"
			borderTop="1px solid Accent"
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
					<Button onClick={selectLocalProject}>
						Open Project
					</Button>
				</Flex>
			</Stack>
		</Flex>
	)
}

export { CloneSuccess }
