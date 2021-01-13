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
		<LimitInteraction
			as={Stack}
			unlimit={Boolean(selectedRepo)}
			flexShrink={0}
			width="100%"
			borderTop="1px solid Accent"
			padding={3}
			backgroundColor="Card"
			borderBottomRightRadius="Large"
		>
			<Stack>
				<AccentText marginBottom={1}>
					Save Location
				</AccentText>
				<DirectoryInput
					value={directory}
					onClick={selectDirectory}
				/>
			</Stack>
			<Stack>
				<AccentText marginBottom={1}>
					Branch Name
				</AccentText>
				<Input
					value={branchName}
					onChange={(event) => setBranchName(event.target.value)}
				/>
			</Stack>
			<LimitInteraction
				as={PrimaryButton}
				unlimit={selectedRepo && directory}
				onClick={cloneProject}
			>
				Submit
			</LimitInteraction>
		</LimitInteraction>
	)
}

export { BottomToolbar }
