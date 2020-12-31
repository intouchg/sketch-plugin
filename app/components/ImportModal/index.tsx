import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { themeTypePropertyMap } from '@i/theme'
import { Flex, Box } from '@i/components'
import { ModalBackground } from '../ModalBackground'
import { RightToolbar } from './RightToolbar'
import { Colors } from './Colors'
import { Fonts } from './Fonts'
import { FontSizes } from './FontSizes'
import { LineHeights } from './LineHeights'
import { Shadows } from './Shadows'
import { BorderWidths } from './BorderWidths'
import { LetterSpacings } from './LetterSpacings'
import { sendSketchCommand } from '../../sketchApi'
import { saveImportedSketchValues } from '../../store'
import type { ThemeValue } from '@i/theme'

// TO DO: Loading component

const views = {
	color: Colors,
	font: Fonts,
	fontSize: FontSizes,
	lineHeight: LineHeights,
	shadow: Shadows,
	borderWidth: BorderWidths,
	letterSpacing: LetterSpacings,
} as const

export type ImportModalRoute = keyof typeof views

export const routes = Object.keys(views) as ImportModalRoute[]

export const routeTitles: { [key in ImportModalRoute]: string } = {
	color: 'Colors',
	font: 'Fonts',
	fontSize: 'Type Scale',
	lineHeight: 'Line Heights',
	shadow: 'Shadows',
	borderWidth: 'Borders',
	letterSpacing: 'Letter Spacings',
}

type SelectedImportedValue = ThemeValue & { willOverwriteByName?: boolean }

// TO DO: Create loading component

const ImportModal = ({
	closeImportModal,
}: {
	closeImportModal: () => void
}) => {
	const dispatch = useDispatch()
	const sketchDocumentNames = useSelector((state) => state.theme.sketchDocumentNames)
	const importedSketchValues = useSelector((state) => state.theme.importedSketchValues)
	const themeValues = useSelector((state) => state.theme.values)
	const [ activeRoute, setActiveRoute ] = useState<ImportModalRoute>('color')
	const [ selectedSketchDocumentIndex, setSelectedSketchDocumentIndex ] = useState<number>(0)
	const [ selectedImportCategories, setSelectedImportCategories ] = useState<ImportModalRoute[]>([])
	const [ selectedImportedValues, setSelectedImportedValues ] = useState<SelectedImportedValue[]>([])
	const [ showLoading, setShowLoading ] = useState(false)

	const ImportView = views[activeRoute]

	useEffect(() => setShowLoading(false), [ importedSketchValues ])

	useEffect(() => {
		setSelectedImportCategories([])
		setSelectedImportedValues([])
		setSelectedSketchDocumentIndex(0)

		if (sketchDocumentNames.length) {
			sendSketchCommand('extractSketchDocumentStyles', 0)
		}
		else {
			closeImportModal()
		}
	}, [ sketchDocumentNames ])

	useEffect(() => {
		setSelectedImportCategories([])
		setSelectedImportedValues([])

		if (sketchDocumentNames.length) {
			setShowLoading(true)
			sendSketchCommand('extractSketchDocumentStyles', selectedSketchDocumentIndex)
		}
	}, [ selectedSketchDocumentIndex ])

	if (!sketchDocumentNames.length) {
		return null
	}

	const saveSelectedImportedValues = () => {
		dispatch(saveImportedSketchValues(
			selectedImportedValues.filter((v) => selectedImportCategories.includes(v.type as any)),
		))

		closeImportModal()
	}

	const toggleSelectedImportedValue = (value: SelectedImportedValue) => {
		const valueId = value.id

		setSelectedImportedValues((state) => {
			if (state.some((v) => v.id === valueId)) {
				return state.filter((v) => v.id !== valueId)
			}

			return [ ...state, value ]
		})
	}

	const routeThemeValues = themeValues.filter((v) => v.type === activeRoute)

	const routeImportedSketchValues = (importedSketchValues[themeTypePropertyMap[activeRoute]] as any).map((value: ThemeValue) => ({
		...value,
		imported: true,
		selected: selectedImportedValues.some((v) => v.id === value.id),
	}))

	const numberOfSelectedImportedValuesBySaveType: {
		[key in ImportModalRoute]: { new: number, overwrite: number }
	} = {
		color: { new: 0, overwrite: 0 },
		font: { new: 0, overwrite: 0 },
		fontSize: { new: 0, overwrite: 0 },
		lineHeight: { new: 0, overwrite: 0 },
		shadow: { new: 0, overwrite: 0 },
		borderWidth: { new: 0, overwrite: 0 },
		letterSpacing: { new: 0, overwrite: 0 },
	}

	selectedImportedValues.forEach((v) => {
		const valueType = v.hasOwnProperty('type') ? (v as ThemeValue).type : 'font'
		const saveType = v.willOverwriteByName ? 'overwrite' : 'new';
		(numberOfSelectedImportedValuesBySaveType as any)[valueType][saveType] += 1
	})

	return (
		<ModalBackground>
			<Flex
				width="calc(100vw - 308px)"
				minWidth="800px"
				height="calc(100vh - 100px)"
				minHeight="460px"
				backgroundColor="Card"
				boxShadow="Medium"
				borderRadius="Large"
			>
				<Flex
					alignItems="center"
					justifyContent="center"
					flexGrow={1}
					padding={6}
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
				</Flex>
				<RightToolbar
					activeRoute={activeRoute}
					setActiveRoute={setActiveRoute}
					selectedImportCategories={selectedImportCategories}
					setSelectedImportCategories={setSelectedImportCategories}
					closeImportModal={closeImportModal}
					sketchDocumentNames={sketchDocumentNames}
					selectedSketchDocumentIndex={selectedSketchDocumentIndex}
					setSelectedSketchDocumentIndex={setSelectedSketchDocumentIndex}
					saveSelectedImportedValues={saveSelectedImportedValues}
					numberOfSelectedImportedValuesBySaveType={numberOfSelectedImportedValuesBySaveType}
				/>
			</Flex>
		</ModalBackground>
	)
}

export { ImportModal }
