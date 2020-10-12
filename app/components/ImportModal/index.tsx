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
import type { ImportedSketchStyles } from '../../sketchApi'
import type { ThemeValue } from '@i/theme'

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

const formatImportStyles = (styles: ImportedSketchStyles) => {
	const themeValues: ThemeValue[] = []

	Object.entries(themeTypePropertyMap).forEach(([ themeValueType, themeProperty ]) => {
		if (styles[themeProperty]) {
			styles[themeProperty].forEach((value: string | number) => {
				const data = createThemeValue(themeValues, themeValueType as ThemeValue['type'], { value })
				themeValues.push(data)
			})
		}
	})

	return themeValues
}

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

const ImportModal = ({
	closeImportModal,
}: {
	closeImportModal: () => void
}) => {
	const sketchDocumentNames = useSelector((state) => state.theme.sketchDocumentNames)
	const [ route, setRoute ] = useState<ImportModalRoute>('Colors')
	const [ selectedSketchDocumentIndex, setSelectedSketchDocumentIndex ] = useState<number>(0)
	const [ importThemeValues, setImportThemeValues ] = useState<ThemeValue[]>([])

	const ImportView = views[route]

	useEffect(() => {
		window.setSketchImportData = (styles) => setImportThemeValues(formatImportStyles(styles))
		sketchRequest('extractSketchDocumentStyles', selectedSketchDocumentIndex)
		return () => void delete window.setSketchImportData
	}, [])

	const routeThemeValues = {} as any

	importThemeValues.forEach((value) => {
		const key = themeTypePropertyMap[value.type]

		if (!themeTypeRouteMap[route].includes(key)) {
			return
		}

		if (!routeThemeValues[key]) {
			routeThemeValues[key] = []
		}

		routeThemeValues[key].push(value)
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
					<ImportView {...routeThemeValues} />
				</ResponsiveContainer>
				<RightToolbar
					route={route}
					setRoute={setRoute}
					closeImportModal={closeImportModal}
					sketchDocumentNames={sketchDocumentNames}
					setSelectedSketchDocumentIndex={setSelectedSketchDocumentIndex}
				/>
			</Flex>
		</Flex>
	)
}

export { ImportModal }
