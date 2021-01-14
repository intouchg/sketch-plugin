import React, { useState } from 'react'
import { batch } from 'react-redux'
import { Stack, Heading, Input, Flex, Text } from '@i/components'
import { PrimaryButton, SecondaryButton } from '../Buttons'
import { AccentText } from '../Texts'
import { DirectoryInput } from '../DirectoryInput'
import { sendSketchCommand } from '../../sketchApi'
import { useDisplayErrorBanner } from '../../hooks'
import type { AzureGitRepo } from '@i/azure'

const MISSING_SAVE_LOCATION_ERROR = 'You must select a save location before downloading a project.'

const DownloadRepo = ({
	repo,
	resetSelectedRepo,
}: {
	repo: AzureGitRepo
	resetSelectedRepo: () => void
}) => {
	const [ directory, setDirectory ] = useState('')
	const [ branchName, setBranchName ] = useState('')
	const [ error, setError ] = useState('')
	const displayErrorBanner = useDisplayErrorBanner()

	const selectDirectory = () => sendSketchCommand('selectDirectory', {})
		.then((filepath) => batch(() => {
			if (error === MISSING_SAVE_LOCATION_ERROR) {
				setError('')
			}

			setDirectory(filepath)
		}))
		.catch((error) => displayErrorBanner(error))

	const cloneProject = () => {
		if (!directory) {
			return setError(MISSING_SAVE_LOCATION_ERROR)
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
						borderWidth="1px"
						borderStyle="solid"
						borderColor={error ? 'Critical' : 'transparent'}
						value={directory}
						onClick={selectDirectory}
					/>
					{error && (
						<Text
							paddingY={2}
							color="Critical"
						>
							{error}
						</Text>
					)}
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
