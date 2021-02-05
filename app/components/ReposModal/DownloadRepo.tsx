import React, { useState, useEffect } from 'react'
import { useSelector, batch } from 'react-redux'
import { useSpring } from 'react-spring'
import { Stack, Heading, Input, Flex, Text, Button } from '@i/components'
import { DirectoryInput } from '../DirectoryInput'
import { CloneProgress } from './CloneProgress'
import { CloneSuccess } from './CloneSuccess'
import { sendSketchCommand } from '../../sketchApi'
import { useDisplayErrorBanner } from '../../hooks'
import type { AzureGitRepo } from '@i/azure'

const MISSING_SAVE_LOCATION_ERROR = 'Select a save location to download the project.'

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

	const selectDirectory = (filepath: string) => batch(() => {
		if (error === MISSING_SAVE_LOCATION_ERROR) {
			setError('')
		}

		setDirectory(filepath)
	})

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
					.catch((error) => {
						setShowProgress(false)
						displayErrorBanner('Failed to install dependencies. Please contact a developer for support. Error: ' + error, 'Install failed')
					})
			}))
			.catch((error) => {
				setShowProgress(false)

				if (error.includes('already exists and is not an empty directory')) {
					displayErrorBanner('A project with that name already exists in the save location.', 'Duplicate project')
				}
				else {
					displayErrorBanner('Failed to download project. Please contact a developer for support. Error: ' + error, 'Download failed')
				}
			})
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
			padding={3}
			backgroundColor="Background"
		>
			<Stack
				width="100%"
				maxWidth="560px"
			>
				<Stack marginBottom={5}>
					<Text
						variant="Accent"
						marginBottom={2}
					>
						Project Name
					</Text>
					<Heading marginBottom={2}>
						{repo.name}
					</Heading>
					<Text>
						A new folder with this name will be created at the save location.
					</Text>
				</Stack>
				<Stack marginBottom={3}>
					<Text
						variant="Accent"
						marginBottom={2}
					>
						Save Location *
					</Text>
					<DirectoryInput
						error={Boolean(error)}
						value={directory}
						onChange={selectDirectory}
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
					<Text
						variant="Accent"
						marginBottom={2}
					>
						Branch Name
					</Text>
					<Input
						autoCorrect="off"
						autoCapitalize="off"
						autoComplete="off"
						spellCheck="false"
						style={{ transform: 'scale3d(1, 1, 1)' }}
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
