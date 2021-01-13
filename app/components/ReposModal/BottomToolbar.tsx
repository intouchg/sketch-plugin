import React, { useState } from 'react'
import { Stack, Input } from '@i/components'
import { PrimaryButton } from '../Buttons'
import { AccentText } from '../Texts'
import { DirectoryInput } from '../DirectoryInput'
import { LimitInteraction } from '../LimitInteraction'
import { sendSketchCommand } from '../../sketchApi'
import { useDisplayErrorBanner } from '../../hooks'
import type { AzureGitRepo } from '@i/azure'

const BottomToolbar = ({
	selectedRepo,
}: {
	selectedRepo: AzureGitRepo | undefined
}) => {
	const [ directory, setDirectory ] = useState('')
	const [ branchName, setBranchName ] = useState('')
	const displayErrorBanner = useDisplayErrorBanner()

	const selectDirectory = () => sendSketchCommand('selectDirectory', {})
		.then((filepath) => setDirectory(filepath))
		.catch((error) => displayErrorBanner(error))

	const cloneProject = () => sendSketchCommand('cloneAzureGitRepo', { filepath: directory })
		.then(() => {
			console.log('clone success')
		})
		.catch((error) => displayErrorBanner(error))

	return (
		<Stack
			flexShrink={0}
			width="100%"
			borderTop="1px solid Accent"
			padding={3}
			backgroundColor="Background"
			borderBottomRightRadius="Large"
			boxShadow="0 -2px 6px -2px rgba(0, 0, 0, 0.15)"
		>
			<LimitInteraction unlimit={Boolean(selectedRepo)}>
				<Stack marginBottom={3}>
					<AccentText marginBottom={2}>
						Save Location
					</AccentText>
					<DirectoryInput
						value={directory}
						onClick={selectDirectory}
					/>
				</Stack>
				<Stack marginBottom={3}>
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
			</LimitInteraction>
			<LimitInteraction
				as={PrimaryButton}
				unlimit={selectedRepo && directory}
				onClick={cloneProject}
			>
				Submit
			</LimitInteraction>
		</Stack>
	)
}

export { BottomToolbar }
