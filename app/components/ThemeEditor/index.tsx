import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Colors } from './Colors'

const ThemeEditor = ({ path }: { path: string }) => (
	<Switch>
		<Route path={`${path}/theme/colors`}>
			<Colors />
		</Route>
		<Route path={`${path}/theme/fonts`}>
			Fonts
		</Route>
		<Route path={`${path}/theme/typescale`}>
			Type Scale
		</Route>
		<Route path={`${path}/theme/elevation`}>
			Elevation
		</Route>
		<Route path={`${path}/theme/spacing`}>
			Spacing
		</Route>
		<Route path={`${path}/theme/borders`}>
			Borders
		</Route>
		<Route path={`${path}/theme`}>
			<Redirect to={`${path}/theme/colors`} />
		</Route>
	</Switch>
)

export { ThemeEditor }
