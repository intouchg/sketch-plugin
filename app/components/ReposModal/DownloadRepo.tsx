import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, batch } from 'react-redux'
import { useSpring } from 'react-spring'
import { Stack, Heading, Input, Flex, Text, Button } from '@i/components'
import { AccentText } from '../Texts'
import { DirectoryInput } from '../DirectoryInput'
import { CloneProgress } from './CloneProgress'
import { CloneSuccess } from './CloneSuccess'
import { sendSketchCommand } from '../../sketchApi'
import { useDisplayErrorBanner } from '../../hooks'
import type { AzureGitRepo } from '@i/azure'

const BranchNameInput = styled(Input).attrs<
	typeof Input
>((props) => ({
	autoCorrect: 'off',
	autoCapitalize: 'off',
	autoComplete: 'off',
	spellCheck: 'false',
}))`
	transform: scale3d(1, 1, 1);
`

const MISSING_SAVE_LOCATION_ERROR = 'Select a save location before downloading a project.'

const DownloadRepo = ({
	repo,
	resetSelectedRepo,
}: {
	repo: AzureGitRepo
	resetSelectedRepo: () => void
}) => {
	const defaultSaveDirectory = useSelector((state) => state.settings.defaultSaveDirectory)
	const [ directory, setDirectory ] = useState(defaultSaveDirectory || '')
	const [ branchName, setBranchName ] = useState('')
	const [ showProgress, setShowProgress ] = useState(false)
	const [ showSuccess, setShowSuccess ] = useState(false)
	const [ progressMessage, setProgressMessage ] = useState('Downloading project ...')
	const [ error, setError ] = useState('')
	const displayErrorBanner = useDisplayErrorBanner()
	const [ { progress }, setSpring ] = useSpring({ progress: 0 }, [])

	useEffect(() => {
		window.updateCloneProgress = (progress) => setSpring({ progress: progress / 100 })
		return () => void delete window.updateCloneProgress
	}, [ setSpring ])

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

		setShowProgress(true)

		sendSketchCommand('cloneAzureGitRepo', { filepath: directory, remoteUrl: repo.remoteUrl, repoName: repo.name, branchName })
			.then(() => batch(() => {
				setProgressMessage('Installing ...')
				setSpring({ progress: 0, immediate: true })

				sendSketchCommand('installDependencies', { filepath: directory + '/' + repo.name })
					.then(() => batch(() => {
						setShowProgress(false)
						setShowSuccess(true)
					}))
					.catch((error) => displayErrorBanner('Please contact a developer for support. Error installing dependencies: ' + error))
			}))
			.catch((error) => displayErrorBanner('Please contact a developer for support. Error downloading project: ' + error))
	}

	if (showProgress) {
		return (
			<CloneProgress
				progress={progress}
				message={progressMessage}
			/>
		)
	}

	if (showSuccess) {
		return (
			<CloneSuccess
				repo={repo}
				directory={directory + '/' + repo.name}
			/>
		)
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
				<Stack marginBottom={5}>
					<AccentText marginBottom={2}>
						Project Name
					</AccentText>
					<Heading marginBottom={2}>
						{repo.name}
					</Heading>
					<Text>
						A new folder with this name will be created at the save location.
					</Text>
				</Stack>
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
					<BranchNameInput
						value={branchName}
						placeholder="Only change this if instructed by a developer"
						onChange={(event) => setBranchName(event.target.value)}
					/>
				</Stack>
				<Flex justifyContent="space-between">
					<Button
						variant="Secondary"
						onClick={resetSelectedRepo}
					>
						Back
					</Button>
					<Button onClick={cloneProject}>
						Download
					</Button>
				</Flex>
			</Stack>
		</Flex>
	)
}

export { DownloadRepo }
