import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Flex } from '@i/components'
import { TopToolbar, LeftNavbar, ThemeEditor, ComponentEditor, ImportModal } from '../components'
import { useWindowUndoListener } from '../hooks'
import type { AzureModalState } from '../App'

const Main = ({
	azureModalState,
	setAzureModalState,
	setShowSettingsModal,
}: {
	azureModalState: AzureModalState
	setAzureModalState: React.Dispatch<React.SetStateAction<AzureModalState>>
	setShowSettingsModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const [ showImportModal, setShowImportModal ] = useState(false)
	const localProject = useSelector((state) => state.azure.localProject)
	useWindowUndoListener(!showImportModal && !azureModalState)

	if (!localProject) {
		return (
			<Navigate to="/" />
		)
	}

	return (
		<>
			<TopToolbar
				showProjectOptions
				setShowImportModal={setShowImportModal}
				setAzureModalState={setAzureModalState}
				setShowSettingsModal={setShowSettingsModal}
			/>
			<Flex>
				<LeftNavbar />
				<Routes>
					<Route
						path="/"
						element={
							<Navigate to="theme" />
						}
					/>
					<Route
						path="theme/*"
						element={
							<ThemeEditor />
						}
					/>
					<Route
						path="components/*"
						element={
							<ComponentEditor />
						}
					/>
				</Routes>
			</Flex>
			{showImportModal && (
				<ImportModal setShowImportModal={setShowImportModal} />
			)}
		</>
	)
}

export { Main }
