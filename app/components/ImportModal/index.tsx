import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { themeTypePropertyMap } from '@i/theme'
import { Flex, Box } from '@i/components'
import { RightToolbar } from './RightToolbar'
import { Colors } from './Colors'
import { Fonts } from './Fonts'
import { TypeScale } from './TypeScale'
import { Shadows } from './Shadows'
import { Borders } from './Borders'
import { sketchRequest } from '../../sketchApi'
import type { ThemeValue } from '@i/theme'

const views = {
	Colors: Colors,
	Fonts: Fonts,
	'Type Scale': TypeScale,
	Shadows: Shadows,
	Borders: Borders,
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
}

// TO DO: Create loading component

const ImportModal = ({
	closeImportModal,
}: {
	closeImportModal: () => void
}) => {
	const sketchDocumentNames = useSelector((state) => state.theme.sketchDocumentNames)
	const importedSketchStyles = useSelector((state) => state.theme.importedSketchStyles)
	const themeValues = useSelector((state) => state.theme.values)
	const [ route, setRoute ] = useState<ImportModalRoute>('Colors')
	const [ selectedSketchDocumentIndex, setSelectedSketchDocumentIndex ] = useState<number>(0)
	const [ selectedImportCategories, setSelectedImportCategories ] = useState<ImportModalRoute[]>([])
	const [ showLoading, setShowLoading ] = useState(false)

	const ImportView = views[route]

	useEffect(() => setShowLoading(false), [ importedSketchStyles ])

	useEffect(() => {
		setSelectedImportCategories([])
		setSelectedSketchDocumentIndex(0)

		if (sketchDocumentNames.length) {
			sketchRequest('extractSketchDocumentStyles', 0)
		}
		else {
			closeImportModal()
		}
	}, [ sketchDocumentNames ])

	useEffect(() => {
		setSelectedImportCategories([])

		if (sketchDocumentNames.length) {
			setShowLoading(true)
			sketchRequest('extractSketchDocumentStyles', selectedSketchDocumentIndex)
		}
	}, [ selectedSketchDocumentIndex ])

	if (!sketchDocumentNames.length) {
		return null
	}

	const themeTypes = themeTypeRouteMap[route]
	const routeThemeValues = {} as any

	themeTypes.forEach((type) => routeThemeValues[type] = [])

	themeValues.forEach((value) => {
		const themeType = themeTypePropertyMap[value.type]

		if (themeTypes.includes(themeType)) {
			routeThemeValues[themeType].push(value)
		}
	})

	Object.entries(importedSketchStyles).forEach(([ key, values ]) => {
		const type = key as any

		values.forEach((value: ThemeValue) => {
			if (themeTypes.includes(type) && !routeThemeValues[type].some((v: ThemeValue) => v.value === value.value)) {
				routeThemeValues[type].push({ ...value, imported: true })
			}
		})
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
				minWidth="800px"
				height="calc(100vh - 100px)"
				backgroundColor="Card"
				boxShadow="Medium"
				borderRadius="Large"
			>
				<Box
					flexGrow={1}
					overflowY="scroll"
				>
					{showLoading ? (
						<>
							LOADING
						</>
					) : (
						<ImportView {...routeThemeValues} />
					)}
				</Box>
				<RightToolbar
					route={route}
					setRoute={setRoute}
					selectedImportCategories={selectedImportCategories}
					setSelectedImportCategories={setSelectedImportCategories}
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
