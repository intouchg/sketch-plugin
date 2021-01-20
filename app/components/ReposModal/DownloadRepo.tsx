import React, { useState, useEffect } from 'react'
import { batch } from 'react-redux'
import { useSpring, animated } from 'react-spring'
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
	const [ showCloning, setShowCloning ] = useState(false)
	const [ error, setError ] = useState('')
	const displayErrorBanner = useDisplayErrorBanner()
	const [ spring, setSpring ] = useSpring({ x: 0 }, [])

	useEffect(() => {
		window.updateCloneProgress = (progress) => setSpring({ x: progress / 100 })
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

		setShowCloning(true)

		sendSketchCommand('cloneAzureGitRepo', { filepath: directory, remoteUrl: repo.remoteUrl, branchName })
			.then(() => batch(() => {
				setShowCloning(false)
				console.log('clone success')
			}))
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
			{showCloning && (
				<Stack
					alignItems="center"
					justifyContent="center"
					position="fixed"
					top="0"
					bottom="0"
					left="0"
					right="0"
					backgroundColor="Card"
					zIndex={4}
				>
					<Text marginBottom={4}>
						Downloading project ...
					</Text>
					<svg
						style={{ margin: '0 12px', width: 120, height: 120 }}
						viewBox="0 0 51 51"
						strokeWidth="6.5"
						fill="transparent"
						strokeLinecap="butt"
						strokeLinejoin="round"
						strokeDasharray={138}
					>
						<circle
							stroke="#f8f8f8"
							transform="translate(25.500000, 25.500000) rotate(-90.000000) translate(-25.500000, -25.500000)"
							cx="25.5"
							cy="25.5"
							r="22"
						/>
						<animated.circle
							strokeDashoffset={spring.x.to((v) => (1 - v) * 138)}
							stroke="#2c90ce"
							transform="translate(25.500000, 25.500000) rotate(-90.000000) translate(-25.500000, -25.500000)"
							cx="25.5"
							cy="25.5"
							r="22"
						/>
					</svg>
				</Stack>
			)}
		</Flex>
	)
}

export { DownloadRepo }
