import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { themeTypePropertyMap } from '@i/theme'
import { Flex, Box } from '@i/components'
import { RightToolbar } from './RightToolbar'
import { Colors } from './Colors'
import { Fonts } from './Fonts'
import { FontSizes } from './FontSizes'
import { Shadows } from './Shadows'
import { BorderWidths } from './BorderWidths'
import { sketchRequest } from '../../sketchApi'
import type { ThemeValue } from '@i/theme'
import type { SPFontTypeface } from '../../sketchApi'

const views = {
	color: Colors,
	font: Fonts,
	fontSize: FontSizes,
	shadow: Shadows,
	borderWidth: BorderWidths,
} as const

export type ImportModalRoute = keyof typeof views

export const routes = Object.keys(views) as ImportModalRoute[]

export const routeTitles: { [key in ImportModalRoute]: string } = {
	color: 'Colors',
	font: 'Fonts',
	fontSize: 'Type Scale',
	shadow: 'Shadows',
	borderWidth: 'Borders',
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
	const [ route, setRoute ] = useState<ImportModalRoute>('color')
	const [ selectedSketchDocumentIndex, setSelectedSketchDocumentIndex ] = useState<number>(0)
	const [ selectedImportCategories, setSelectedImportCategories ] = useState<ImportModalRoute[]>([])
	const [ selectedImportStyles, setSelectedImportStyles ] = useState<(ThemeValue | SPFontTypeface)[]>([])
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

	const toggleSelectedImportStyle = (style: ThemeValue | SPFontTypeface) => {
		const comparisonProp = route === 'font' ? '_name' : 'id'
		const comparisonValue = (style as any)[comparisonProp]

		setSelectedImportStyles((state) => {
			if (state.some((v) => (v as any)[comparisonProp] === comparisonValue)) {
				return state.filter((v) => (v as any)[comparisonProp] !== comparisonValue)
			}

			return [ ...state, style ]
		})
	}

	const routeThemeProperty = themeTypePropertyMap[route]
	const routeThemeValues = themeValues.filter((v) => v.type === route)
	const routeImportedSketchStyles = importedSketchStyles[routeThemeProperty]
	const importViewProp = { [routeThemeProperty]: routeThemeValues.concat(routeImportedSketchStyles) }

	const routeSelectedImportStyles = selectedImportStyles.filter((v) => {
		if (route === 'font') {
			return v.hasOwnProperty('_name')
		}

		return (v as ThemeValue).type === route
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
						<ImportView
							{...importViewProp as any}
							routeSelectedImportStyles={routeSelectedImportStyles}
							toggleSelectedImportStyle={toggleSelectedImportStyle}
						/>
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
