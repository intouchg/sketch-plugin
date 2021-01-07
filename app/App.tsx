import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import sketchPluginTheme from './theme/theme'
import { useWindowSketchListener, useWindowInternetListener, useInitializeSketchData } from './hooks'
import { Welcome, Main } from './pages'
import { MessageBanner, AzureModal, SettingsModal } from './components'

export type AzureModalState = 'standard' | 'redirectToRepos' | null

const App = () => {
	useWindowSketchListener()
	useWindowInternetListener()
	useInitializeSketchData()
	const [ showSettingsModal, setShowSettingsModal ] = useState(false)
	const [ showReposModal, setShowReposModal ] = useState(false)
	const [ azureModalState, setAzureModalState ] = useState<AzureModalState>(null)

	return (
		<ThemeProvider theme={sketchPluginTheme}>
			<MessageBanner />
			<Routes>
				<Route
					path="/"
					element={
						<Welcome
							showReposModal={showReposModal}
							setShowReposModal={setShowReposModal}
							setAzureModalState={setAzureModalState}
							setShowSettingsModal={setShowSettingsModal}
						/>
					}
				/>
				<Route
					path="main/*"
					element={
						<Main
							setAzureModalState={setAzureModalState}
							setShowSettingsModal={setShowSettingsModal}
						/>
					}
				/>
			</Routes>
			{azureModalState && (
				<AzureModal
					azureModalState={azureModalState}
					setAzureModalState={setAzureModalState}
					setShowReposModal={setShowReposModal}
				/>
			)}
			{showSettingsModal && (
				<SettingsModal setShowSettingsModal={setShowSettingsModal} />
			)}
		</ThemeProvider>
	)
}

export default App
