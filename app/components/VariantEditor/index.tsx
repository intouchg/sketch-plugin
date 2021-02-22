import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Editor } from './Editor'

const VariantEditor = () => (
	<Routes>
		<Route
			path="/"
			element={
				<Navigate to="button/" />
			}
		/>
		<Route
			path="/:variantKey/"
			element={
				<Editor />
			}
		/>
	</Routes>
)

export { VariantEditor }
