import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { useInitializeSketchData } from './sketchApi'
import { ThemeProvider } from 'styled-components'
import sketchPluginTheme from './theme/theme'
import { Welcome, Main } from './pages'
import { MessageBanner } from './components'

const App = () => {
	useInitializeSketchData()

	return (
		<ThemeProvider theme={sketchPluginTheme}>
			<MessageBanner />
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
