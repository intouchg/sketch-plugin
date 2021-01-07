import React, { useState } from 'react'
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
	const [ showAzureModal, setShowAzureModal ] = useState(false)
	const [ showSettingsModal, setShowSettingsModal ] = useState(false)

	return (
		<ThemeProvider theme={sketchPluginTheme}>
			<MessageBanner />
			<Routes>
				<Route
					path="/"
					element={
						<Welcome
							setShowAzureModal={setShowAzureModal}
							setShowSettingsModal={setShowSettingsModal}
						/>
					}
				/>
				<Route
					path="main/*"
					element={
						<Main
							setShowAzureModal={setShowAzureModal}
							setShowSettingsModal={setShowSettingsModal}
						/>
					}
				/>
			</Routes>
			{showAzureModal && (
				<AzureModal setShowAzureModal={setShowAzureModal} />
			)}
			{showSettingsModal && (
				<SettingsModal setShowSettingsModal={setShowSettingsModal} />
			)}
		</ThemeProvider>
	)
}

export default App
