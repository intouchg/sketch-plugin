import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const ComponentEditor = () => (
	<Routes>
		<Route
			path="/"
			element={
				<Navigate to="button/" />
			}
		/>
		<Route
			path="button"
			element={
				<div>Button</div>
			}
		/>
		<Route
			path="heading"
			element={
				<div>Heading</div>
			}
		/>
		<Route
			path="icon"
			element={
				<div>Icon</div>
			}
		/>
		<Route
			path="input"
			element={
				<div>Input</div>
			}
		/>
		<Route
			path="label"
			element={
				<div>Label</div>
			}
		/>
		<Route
			path="link"
			element={
				<div>Link</div>
			}
		/>
		<Route
			path="text"
			element={
				<div>Text</div>
			}
		/>
	</Routes>
)

export { ComponentEditor }
