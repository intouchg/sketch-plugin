import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

const ComponentEditor = ({ path }: { path: string }) => (
	<Switch>
		<Route path={`${path}/components/button`}>
			Button
		</Route>
		<Route path={`${path}/components/heading`}>
			Heading
		</Route>
		<Route path={`${path}/components/icon`}>
			Icon
		</Route>
		<Route path={`${path}/components/input`}>
			Input
		</Route>
		<Route path={`${path}/components/label`}>
			Label
		</Route>
		<Route path={`${path}/components/link`}>
			Link
		</Route>
		<Route path={`${path}/components/text`}>
			Text
		</Route>
		<Route path={`${path}/components`}>
			<Redirect to={`${path}/components/button`} />
		</Route>
	</Switch>
)

export { ComponentEditor }
