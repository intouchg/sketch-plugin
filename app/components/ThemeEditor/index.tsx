import React, { useState } from 'react'
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
import { DeleteModal } from './DeleteModal'
import { rightToolbarWidth } from './RightToolbar'
import type { ThemeValue } from '@intouchg/theme'

const ThemeEditor = ({
	containerWidth,
}: {
	containerWidth: number
}) => {
	const [ deleteValue, setDeleteValue ] = useState<ThemeValue | null>(null)

	return (
		<>
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
						<Colors
							containerWidth={containerWidth - rightToolbarWidth}
							setDeleteValue={setDeleteValue}
						/>
					}
				/>
				<Route
					path="fonts"
					element={
						<Fonts setDeleteValue={setDeleteValue} />
					}
				/>
				<Route
					path="fontSizes"
					element={
						<FontSizes setDeleteValue={setDeleteValue} />
					}
				/>
				<Route
					path="lineHeights"
					element={
						<LineHeights setDeleteValue={setDeleteValue} />
					}
				/>
				<Route
					path="letterSpacings"
					element={
						<LetterSpacings setDeleteValue={setDeleteValue} />
					}
				/>
				<Route
					path="shadows"
					element={
						<Shadows setDeleteValue={setDeleteValue} />
					}
				/>
				<Route
					path="borderWidths"
					element={
						<BorderWidths setDeleteValue={setDeleteValue} />
					}
				/>
				<Route
					path="radii"
					element={
						<Radii setDeleteValue={setDeleteValue} />
					}
				/>
				<Route
					path="space"
					element={
						<Space setDeleteValue={setDeleteValue} />
					}
				/>
			</Routes>
			{deleteValue && (
				<DeleteModal
					deleteValue={deleteValue}
					setDeleteValue={setDeleteValue}
				/>
			)}
		</>
	)
}

export { ThemeEditor }
