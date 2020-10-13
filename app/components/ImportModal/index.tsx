import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { themeTypePropertyMap, createThemeValue } from '@i/theme'
import { Flex, Box } from '@i/components'
import { RightToolbar } from './RightToolbar'
import { Colors } from './Colors'
import { Fonts } from './Fonts'
import { TypeScale } from './TypeScale'
import { Shadows } from './Shadows'
import { Borders } from './Borders'
import { Radii } from './Radii'
import { sketchRequest } from '../../sketchApi'

const ResponsiveContainer = styled(Box)`
    flex-grow: 1;
    overflow-y: scroll;
`

const views = {
	Colors: Colors,
	Fonts: Fonts,
	'Type Scale': TypeScale,
	Shadows: Shadows,
	Borders: Borders,
	Radii: Radii,
} as const

export type ImportModalRoute = keyof typeof views

export const routes = Object.keys(views) as ImportModalRoute[]

const themeTypeRouteMap: {
	[key in ImportModalRoute]: typeof themeTypePropertyMap[keyof typeof themeTypePropertyMap][]
} = {
	Colors: [ 'colors' ],
	Fonts: [ 'fonts', 'fontWeights' ],
	'Type Scale': [ 'fontSizes' ],
	Shadows: [ 'shadows' ],
	Borders: [ 'borders', 'borderStyles', 'borderWidths' ],
	Radii: [ 'radii' ],
}

// TO DO: Create loading component

const ImportModal = ({
	closeImportModal,
}: {
	closeImportModal: () => void
}) => {
	const sketchDocumentNames = useSelector((state) => state.theme.sketchDocumentNames)
	const importedSketchStyles = useSelector((state) => state.theme.importedSketchStyles)
	const [ route, setRoute ] = useState<ImportModalRoute>('Colors')
	const [ selectedSketchDocumentIndex, setSelectedSketchDocumentIndex ] = useState<number>(0)
	const [ showLoading, setShowLoading ] = useState(false)

	const ImportView = views[route]

	useEffect(() => setShowLoading(false), [ importedSketchStyles ])

	useEffect(() => {
		setSelectedSketchDocumentIndex(0)
		sketchRequest('extractSketchDocumentStyles', 0)
	}, [ sketchDocumentNames ])

	useEffect(() => {
		setShowLoading(true)
		sketchRequest('extractSketchDocumentStyles', selectedSketchDocumentIndex)
	}, [ selectedSketchDocumentIndex ])

	if (!sketchDocumentNames.length) {
		return null
	}

	const routeThemeValues = {} as any

	Object.entries(importedSketchStyles).forEach(([ key, value ]) => {
		if (themeTypeRouteMap[route].includes(key as any)) {
			routeThemeValues[key] = value
		}
	})

	return (
		<Flex
			position="fixed"
			top="0"
			width="100vw"
			height="100vh"
			alignItems="center"
			justifyContent="center"
			backgroundColor="rgba(0, 0, 0, 0.3)"
			zIndex={4}
		>
			<Flex
				width="calc(100vw - 308px)"
				height="calc(100vh - 100px)"
				backgroundColor="Card"
				boxShadow="Medium"
				borderRadius="Large"
			>
				<ResponsiveContainer>
					{showLoading ? (
						<>
							LOADING
						</>
					) : (
						<ImportView {...routeThemeValues} />
					)}
				</ResponsiveContainer>
				<RightToolbar
					route={route}
					setRoute={setRoute}
					closeImportModal={closeImportModal}
					sketchDocumentNames={sketchDocumentNames}
					selectedSketchDocumentIndex={selectedSketchDocumentIndex}
					setSelectedSketchDocumentIndex={setSelectedSketchDocumentIndex}
				/>
			</Flex>
		</Flex>
	)
}

export { ImportModal }
