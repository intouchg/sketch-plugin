import React, { useEffect } from 'react'
import { useHistory, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import sketchPluginTheme from './theme/theme'
import { setThemeData } from './store'
import { Welcome, Main } from './pages'

const App = () => {
	const history = useHistory()
	const dispatch = useDispatch()

	useEffect(() => {
		window.setThemeData = (data) => dispatch(setThemeData(data)) && history.push('/main')
		return () => void delete window.setThemeData
	}, [ history, dispatch ])

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
