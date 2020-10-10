import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useGlobalSketchListeners, sketchRequest } from './sketchApi'

import { ThemeProvider } from 'styled-components'
import sketchPluginTheme from './theme/theme'
import { Welcome, Main } from './pages'

const App = () => {
	useGlobalSketchListeners()
	useEffect(() => void sketchRequest('getRecentProjects'), [])

	return (
		<ThemeProvider theme={sketchPluginTheme}>
			<Switch>
				<Route path="/main">
					<Main />
				</Route>
				<Route path="/">
					<Welcome />
				</Route>
			</Switch>
		</ThemeProvider>
	)
}

export default App
