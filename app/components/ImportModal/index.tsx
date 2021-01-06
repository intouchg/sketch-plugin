import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
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
import { useDisplayErrorBanner } from '../../hooks'
import { setImportedSketchValues, saveImportedSketchValues } from '../../store'
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
	setShowImportModal,
}: {
	setShowImportModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const isMounting = useRef(true)
	const dispatch = useDispatch()
	const sketchDocumentNames = useSelector((state) => state.theme.sketchDocumentNames)
	const importedSketchValues = useSelector((state) => state.theme.importedSketchValues)
	const themeValues = useSelector((state) => state.theme.values)
	const [ activeRoute, setActiveRoute ] = useState<ImportModalRoute>('color')
	const routeThemeValueType = themeTypePropertyMap[activeRoute]
	const routeThemeValues = themeValues[routeThemeValueType]
	const [ selectedSketchDocumentIndex, setSelectedSketchDocumentIndex ] = useState<number>(0)
	const [ selectedImportCategories, setSelectedImportCategories ] = useState<ImportModalRoute[]>([])
	const [ selectedImportedValues, setSelectedImportedValues ] = useState<SelectedImportedValue[]>([])
	const [ showLoading, setShowLoading ] = useState(true)
	const displayErrorBanner = useDisplayErrorBanner()
	const ImportView = views[activeRoute]

	const updateSelectedSketchDocumentIndex = useCallback((index: number) => {
		if (isMounting.current) {
			isMounting.current = false
		}
		else {
			setShowLoading(true)
			setSelectedImportCategories([])
			setSelectedImportedValues([])
			setSelectedSketchDocumentIndex(index)
		}

		sendSketchCommand('extractSketchDocumentStyles', { sketchDocumentIndex: index })
			.then((styles) => batch(() => {
				dispatch(setImportedSketchValues(styles))
				setShowLoading(false)
			}))
			.catch((error) => displayErrorBanner(error))
	}, [ setSelectedImportCategories, setSelectedImportedValues, setSelectedSketchDocumentIndex, dispatch, setShowLoading, displayErrorBanner ])

	useEffect(() => {
		if (sketchDocumentNames.length) {
			updateSelectedSketchDocumentIndex(0)
		}
		else {
			setShowImportModal(false)
		}
	}, [ sketchDocumentNames, setShowLoading, setShowImportModal, updateSelectedSketchDocumentIndex ])

	if (!sketchDocumentNames.length) {
		return null
	}

	const saveSelectedImportedValues = () => {
		dispatch(saveImportedSketchValues(
			selectedImportedValues.filter((v) => selectedImportCategories.includes(v.type as any)),
		))

		setShowImportModal(false)
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

	const routeImportedSketchValues = (importedSketchValues[routeThemeValueType] as any).map((value: ThemeValue) => ({
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
					setShowImportModal={setShowImportModal}
					sketchDocumentNames={sketchDocumentNames}
					selectedSketchDocumentIndex={selectedSketchDocumentIndex}
					updateSelectedSketchDocumentIndex={updateSelectedSketchDocumentIndex}
					saveSelectedImportedValues={saveSelectedImportedValues}
					numberOfSelectedImportedValuesBySaveType={numberOfSelectedImportedValuesBySaveType}
				/>
			</Flex>
		</ModalBackground>
	)
}

export { ImportModal }
