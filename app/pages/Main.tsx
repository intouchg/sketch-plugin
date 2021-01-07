import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Flex } from '@i/components'
import { TopToolbar, LeftNavbar, ThemeEditor, ComponentEditor, ImportModal } from '../components'

const Main = ({
	setShowAzureModal,
}: {
	setShowAzureModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const [ showImportModal, setShowImportModal ] = useState(false)

	return (
		<>
			<TopToolbar
				showProjectOptions
				setShowImportModal={setShowImportModal}
				setShowAzureModal={setShowAzureModal}
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
