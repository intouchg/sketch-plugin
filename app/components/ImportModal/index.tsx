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
import type { SystemFontFamily } from '../../sketchApi'

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

type SelectedImportedValue = (ThemeValue | SystemFontFamily) & { willOverwrite?: boolean }

// TO DO: Create loading component

const ImportModal = ({
	closeImportModal,
}: {
	closeImportModal: () => void
}) => {
	const sketchDocumentNames = useSelector((state) => state.theme.sketchDocumentNames)
	const importedSketchValues = useSelector((state) => state.theme.importedSketchValues)
	const themeValues = useSelector((state) => state.theme.values)
	const [ activeRoute, setActiveRoute ] = useState<ImportModalRoute>('color')
	const [ selectedSketchDocumentIndex, setSelectedSketchDocumentIndex ] = useState<number>(0)
	const [ selectedImportCategories, setSelectedImportCategories ] = useState<ImportModalRoute[]>([])
	const [ selectedImportedValues, setSelectedImportedValues ] = useState<SelectedImportedValue[]>([])
	const [ showLoading, setShowLoading ] = useState(false)

	const ImportView = views[activeRoute]
	const comparisonProp = activeRoute === 'font' ? 'name' : 'id'

	useEffect(() => setShowLoading(false), [ importedSketchValues ])

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

	const toggleSelectedImportedValue = (style: SelectedImportedValue) => {
		const comparisonValue = (style as any)[comparisonProp]

		setSelectedImportedValues((state) => {
			if (state.some((v) => (v as any)[comparisonProp] === comparisonValue)) {
				return state.filter((v) => (v as any)[comparisonProp] !== comparisonValue)
			}

			return [ ...state, style ]
		})
	}

	const routeThemeValues = themeValues.filter((v) => v.type === activeRoute)

	const routeImportedSketchValues = (importedSketchValues[themeTypePropertyMap[activeRoute]] as any).map((value: ThemeValue | SystemFontFamily) => ({
		...value,
		imported: true,
		selected: selectedImportedValues.some((v: any) => v[comparisonProp] === (value as any)[comparisonProp]),
	}))

	const numberOfSelectedImportedValuesBySaveType: {
		[key in ImportModalRoute]: { new: number, overwrite: number }
	} = {
		color: { new: 0, overwrite: 0 },
		font: { new: 0, overwrite: 0 },
		fontSize: { new: 0, overwrite: 0 },
		shadow: { new: 0, overwrite: 0 },
		borderWidth: { new: 0, overwrite: 0 },
	}

	selectedImportedValues.forEach((v) => {
		const valueType = v.hasOwnProperty('type') ? (v as ThemeValue).type : 'font'
		const saveType = v.willOverwrite ? 'overwrite' : 'new';
		(numberOfSelectedImportedValuesBySaveType as any)[valueType][saveType] += 1
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
							values={routeThemeValues as any}
							importedValues={routeImportedSketchValues as any}
							toggleSelectedImportedValue={toggleSelectedImportedValue}
						/>
					)}
				</Box>
				<RightToolbar
					activeRoute={activeRoute}
					setActiveRoute={setActiveRoute}
					selectedImportCategories={selectedImportCategories}
					setSelectedImportCategories={setSelectedImportCategories}
					closeImportModal={closeImportModal}
					sketchDocumentNames={sketchDocumentNames}
					selectedSketchDocumentIndex={selectedSketchDocumentIndex}
					setSelectedSketchDocumentIndex={setSelectedSketchDocumentIndex}
					numberOfSelectedImportedValuesBySaveType={numberOfSelectedImportedValuesBySaveType}
				/>
			</Flex>
		</Flex>
	)
}

export { ImportModal }
