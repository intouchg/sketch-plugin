import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import sketchPluginTheme from './theme/theme'
import { useWindowSketchListener, useWindowInternetListener, useInitializeSketchData } from './hooks'
import { Welcome, Main } from './pages'
import { AzureModal, SettingsModal, LoadingScreen, MessageBanner } from './components'
import { useMeasure } from './hooks'

const App = () => {
	useWindowSketchListener()
	useWindowInternetListener()
	useInitializeSketchData()
	const [ containerRef, containerBounds ] = useMeasure<HTMLDivElement>()

	return (
		<ThemeProvider theme={sketchPluginTheme}>
			<MessageBanner />
			<div ref={containerRef}>
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
							<Main containerWidth={containerBounds.width} />
						}
					/>
				</Routes>
			</div>
			<AzureModal />
			<SettingsModal />
			<LoadingScreen />
		</ThemeProvider>
	)
}

export default App
