import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Colors } from './Colors'

const ThemeEditor = () => (
	<Routes>
		<Route
			path="/"
			element={
				<Navigate to="colors" />
			}
		/>
		<Route
			path="colors"
			element={
				<Colors />
			}
		/>
		<Route
			path="fonts"
			element={<div>Fonts</div>}
		/>
		<Route
			path="typescale"
			element={<div>Type Scale</div>}
		/>
		<Route
			path="elevation"
			element={<div>Elevation</div>}
		/>
		<Route
			path="spacing"
			element={<div>Spacing</div>}
		/>
		<Route
			path="borders"
			element={<div>Borders</div>}
		/>
	</Routes>
)

export { ThemeEditor }
