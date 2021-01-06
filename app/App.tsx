import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import sketchPluginTheme from './theme/theme'
import { useWindowSketchListener, useWindowInternetListener, useInitializeSketchData } from './hooks'
import { Welcome, Main } from './pages'
import { MessageBanner, AzureModal } from './components'

const App = () => {
	useWindowSketchListener()
	useWindowInternetListener()
	useInitializeSketchData()
	const [ showAzureModal, setShowAzureModal ] = useState(false)

	return (
		<ThemeProvider theme={sketchPluginTheme}>
			<MessageBanner />
			<Routes>
				<Route
					path="/"
					element={
						<Welcome setShowAzureModal={setShowAzureModal} />
					}
				/>
				<Route
					path="main/*"
					element={
						<Main setShowAzureModal={setShowAzureModal} />
					}
				/>
			</Routes>
			{showAzureModal && (
				<AzureModal setShowAzureModal={setShowAzureModal} />
			)}
		</ThemeProvider>
	)
}

export default App
