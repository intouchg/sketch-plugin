import React, { useState } from 'react'
import { batch } from 'react-redux'
import { Stack, Heading, Input, Flex, Text } from '@i/components'
import { PrimaryButton, SecondaryButton } from '../Buttons'
import { AccentText } from '../Texts'
import { DirectoryInput } from '../DirectoryInput'
import { sendSketchCommand } from '../../sketchApi'
import { useDisplayErrorBanner } from '../../hooks'
import type { AzureGitRepo } from '@i/azure'

const DownloadRepo = ({
	repo,
	setSelectedRepo,
	setSelectedOrganization,
	setFilterText,
}: {
	repo: AzureGitRepo
	setSelectedRepo: React.Dispatch<React.SetStateAction<AzureGitRepo | null>>
	setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>
	setFilterText: React.Dispatch<React.SetStateAction<string>>
}) => {
	const [ directory, setDirectory ] = useState('')
	const [ branchName, setBranchName ] = useState('')
	const [ error, setError ] = useState('')
	const displayErrorBanner = useDisplayErrorBanner()

	const resetSelectedRepo = () => {
		setFilterText('')
		setSelectedOrganization('')
		setSelectedRepo(null)
	}

	const selectDirectory = () => sendSketchCommand('selectDirectory', {})
		.then((filepath) => batch(() => {
			setError('')
			setDirectory(filepath)
		}))
		.catch((error) => displayErrorBanner(error))

	const cloneProject = () => {
		if (!directory) {
			return setError('You must select a save location before downloading a project.')
		}

		sendSketchCommand('cloneAzureGitRepo', { filepath: directory })
			.then(() => {
				console.log('clone success')
			})
			.catch((error) => displayErrorBanner(error))
	}

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
				<Heading marginBottom={4}>
					{repo.name}
				</Heading>
				<Stack marginBottom={3}>
					<AccentText marginBottom={2}>
						Save Location *
					</AccentText>
					<DirectoryInput
						value={directory}
						onClick={selectDirectory}
					/>
				</Stack>
				<Stack marginBottom={4}>
					<AccentText marginBottom={2}>
						Branch Name
					</AccentText>
					<Input
						padding={3}
						borderRadius="Large"
						value={branchName}
						onChange={(event) => setBranchName(event.target.value)}
					/>
				</Stack>
				<Flex justifyContent="space-between">
					<SecondaryButton onClick={resetSelectedRepo}>
						Back
					</SecondaryButton>
					<PrimaryButton onClick={cloneProject}>
						Download
					</PrimaryButton>
				</Flex>
			</Stack>
		</Flex>
	)
}

export { DownloadRepo }
