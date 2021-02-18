import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Colors } from './Colors'
import { Fonts } from './Fonts'
import { FontSizes } from './FontSizes'
import { LineHeights } from './LineHeights'
import { LetterSpacings } from './LetterSpacings'
import { Shadows } from './Shadows'
import { BorderWidths } from './BorderWidths'
import { Radii } from './Radii'
import { Space } from './Space'
import { rightToolbarWidth } from './RightToolbar'

const ThemeEditor = ({
	containerWidth,
}: {
	containerWidth: number
}) => (
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
				<Colors containerWidth={containerWidth - rightToolbarWidth} />
			}
		/>
		<Route
			path="fonts"
			element={
				<Fonts />
			}
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
			element={
				<Shadows />
			}
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
			path="space"
			element={
				<Space />
			}
		/>
	</Routes>
)

export { ThemeEditor }
