import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import sketchPluginTheme from './theme/theme'
import { useWindowSketchListener, useWindowInternetListener, useInitializeSketchData } from './hooks'
import { Welcome, Main } from './pages'
import { AzureModal, SettingsModal, LoadingScreen, MessageBanner } from './components'

const App = () => {
	useWindowSketchListener()
	useWindowInternetListener()
	useInitializeSketchData()

	return (
		<ThemeProvider theme={sketchPluginTheme}>
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
			<AzureModal />
			<SettingsModal />
			<LoadingScreen />
			<MessageBanner />
		</ThemeProvider>
	)
}

export default App
