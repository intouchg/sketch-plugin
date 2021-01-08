import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Flex } from '@i/components'
import { TopToolbar, LeftNavbar, ThemeEditor, ComponentEditor, ImportModal } from '../components'
import { useWindowUndoListener } from '../hooks'

const Main = () => {
	const [ showImportModal, setShowImportModal ] = useState(false)
	const localProject = useSelector((state) => state.azure.localProject)
	const azureModalState = useSelector((state) => state.azure.azureModalState)
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
