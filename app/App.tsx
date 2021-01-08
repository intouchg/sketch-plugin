import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import sketchPluginTheme from './theme/theme'
import { useWindowSketchListener, useWindowInternetListener, useInitializeSketchData } from './hooks'
import { Welcome, Main } from './pages'
import { MessageBanner, AzureModal, SettingsModal } from './components'

const App = () => {
	useWindowSketchListener()
	useWindowInternetListener()
	useInitializeSketchData()
	const azureModalState = useSelector((state) => state.azure.azureModalState)
	const showSettingsModal = useSelector((state) => state.settings.showSettingsModal)

	return (
		<ThemeProvider theme={sketchPluginTheme}>
			<MessageBanner />
			<Routes>
				<Route
					path="/"
					element={
						<Welcome />
					}
				/>
				<Route
					path="main/*"
					element={
						<Main />
					}
				/>
			</Routes>
			{azureModalState && (
				<AzureModal />
			)}
			{showSettingsModal && (
				<SettingsModal />
			)}
		</ThemeProvider>
	)
}

export default App
