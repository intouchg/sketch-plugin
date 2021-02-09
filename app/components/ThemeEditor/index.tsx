import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Colors } from './Colors'
import { FontSizes } from './FontSizes'
import { LineHeights } from './LineHeights'
import { LetterSpacings } from './LetterSpacings'
import { BorderWidths } from './BorderWidths'
import { Radii } from './Radii'
import { Space } from './Space'

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
			element={
				<FontSizes />
			}
		/>
		<Route
			path="lineHeights"
			element={
				<LineHeights />
			}
		/>
		<Route
			path="letterSpacings"
			element={
				<LetterSpacings />
			}
		/>
		<Route
			path="shadows"
			element={<div>Shadows</div>}
		/>
		<Route
			path="borderWidths"
			element={
				<BorderWidths />
			}
		/>
		<Route
			path="radii"
			element={
				<Radii />
			}
		/>
		<Route
			path="spacing"
			element={
				<Space />
			}
		/>
	</Routes>
)

export { ThemeEditor }
