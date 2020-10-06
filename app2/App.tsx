import React, { useMemo, useState, useEffect } from 'react'
import { useHistory, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import sketchPluginTheme from './theme/theme'
import { Welcome, Main } from './pages'

const App = () => {
	const [ state, setState ] = useState()

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
