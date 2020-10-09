import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { store, RootState } from './store'
import App from './App'

declare module 'react-redux' {
	interface DefaultRootState extends RootState {}
}

const Index = () => (
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>
)

render(<Index />, document.getElementById('app'))
