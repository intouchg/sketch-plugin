import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Flex } from '@i/components'
import { TopToolbar, LeftNavbar, ThemeEditor, ComponentEditor, ImportModal, leftNavbarWidth } from '../components'
import { useWindowUndoListener, useMeasure } from '../hooks'

const Main = () => {
	const [ showImportModal, setShowImportModal ] = useState(false)
	const localProject = useSelector((state) => state.azure.localProject)
	const azureModalState = useSelector((state) => state.azure.azureModalState)
	useWindowUndoListener(!showImportModal && !azureModalState)
	const [ containerRef, containerBounds ] = useMeasure<HTMLDivElement>()

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
			<Flex ref={containerRef}>
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
							<ThemeEditor containerWidth={containerBounds.width - leftNavbarWidth} />
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
