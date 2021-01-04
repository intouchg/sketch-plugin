import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import sketchPluginTheme from './theme/theme'
import { useGlobalSketchListener, useInitializeSketchData } from './hooks'
import { Welcome, Main } from './pages'
import { MessageBanner, AzureModal } from './components'

const App = () => {
	useGlobalSketchListener()
	useInitializeSketchData()
	const [ showAzureModal, setShowAzureModal ] = useState(false)

	return (
		<ThemeProvider theme={sketchPluginTheme}>
			<MessageBanner />
			<Switch>
				<Route path="/main">
					<Main setShowAzureModal={setShowAzureModal} />
				</Route>
				<Route path="/">
					<Welcome setShowAzureModal={setShowAzureModal} />
				</Route>
			</Switch>
			{showAzureModal && (
				<AzureModal setShowAzureModal={setShowAzureModal} />
			)}
		</ThemeProvider>
	)
}

export default App
