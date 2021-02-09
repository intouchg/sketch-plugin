import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Colors } from './Colors'

const ThemeEditor = () => (
	<Routes>
		<Route
			path="/"
			element={
				<Navigate to="colors/" />
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
			path="fontSizes"
			element={<div>Font Sizes</div>}
		/>
		<Route
			path="lineHeights"
			element={<div>Line Heights</div>}
		/>
		<Route
			path="letterSpacings"
			element={<div>Letter Spacings</div>}
		/>
		<Route
			path="shadows"
			element={<div>Shadows</div>}
		/>
		<Route
			path="borderWidths"
			element={<div>Border Widths</div>}
		/>
		<Route
			path="radii"
			element={<div>Radii</div>}
		/>
		<Route
			path="spacing"
			element={<div>Spacing</div>}
		/>
	</Routes>
)

export { ThemeEditor }
