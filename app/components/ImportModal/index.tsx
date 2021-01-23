import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { themeTypePropertyMap } from '@i/theme'
import { Flex, Stack, Heading } from '@i/components'
import { ModalBackground } from '../ModalBackground'
import { CloseModalButton } from '../CloseModalButton'
import { RightToolbar } from './RightToolbar'
import { Loading } from '../Loading'
import { Colors } from './Colors'
import { Fonts } from './Fonts'
import { FontSizes } from './FontSizes'
import { LineHeights } from './LineHeights'
import { Shadows } from './Shadows'
import { BorderWidths } from './BorderWidths'
import { LetterSpacings } from './LetterSpacings'
import { ImportSummary } from './ImportSummary'
import { sendSketchCommand } from '../../sketchApi'
import { useDisplayErrorBanner } from '../../hooks'
import { setImportedSketchValues, saveImportedSketchValues } from '../../store'
import type { ThemeValue } from '@i/theme'

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
	fontSize: 'Font Sizes',
	lineHeight: 'Line Heights',
	letterSpacing: 'Letter Spacings',
	shadow: 'Shadows',
	borderWidth: 'Border Widths',
}

export type ImportedValueProps = { imported: boolean, selected: boolean }
type SelectedImportedValue = ThemeValue & { willOverwriteByName?: boolean }

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
	const [ showSummary, setShowSummary ] = useState(false)
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
	}, [ dispatch, displayErrorBanner ])

	useEffect(() => {
		if (sketchDocumentNames.length) {
			updateSelectedSketchDocumentIndex(0)
		}
		else {
			setShowImportModal(false)
		}
	}, [ sketchDocumentNames, setShowImportModal, updateSelectedSketchDocumentIndex, dispatch ])

	if (!sketchDocumentNames.length) {
		return null
	}

	const saveSelectedImportedValues = () => {
		dispatch(saveImportedSketchValues(
			selectedImportedValues.filter((v) => selectedImportCategories.includes(v.type as any)),
		))

		setShowSummary(true)
	}

	const toggleSelectedImportedValue = (value: SelectedImportedValue) => {
		const id = value.id
		const type = value.type as ImportModalRoute

		if (selectedImportedValues.some((v) => v.id === id)) {
			setSelectedImportedValues((state) => state.filter((v) => v.id !== id))
		}
		else {
			setSelectedImportedValues((state) => [ ...state, value ])

			if (!selectedImportCategories.includes(type)) {
				setSelectedImportCategories((state) => [ ...state, type ])
			}
		}
	}

	const routeImportedSketchValues = (importedSketchValues[routeThemeValueType] as any).map((value: ThemeValue) => ({
		...value,
		imported: true,
		selected: selectedImportedValues.some((v) => v.id === value.id),
	}))

	const numberOfNewValuesByType: { [key in ImportModalRoute]: number } = {
		color: 0,
		font: 0,
		fontSize: 0,
		lineHeight: 0,
		shadow: 0,
		borderWidth: 0,
		letterSpacing: 0,
	}

	selectedImportedValues.forEach((value) => {
		const type = (value.hasOwnProperty('type') ? (value as ThemeValue).type : 'font') as ImportModalRoute
		numberOfNewValuesByType[type] += 1
	})

	return (
		<ModalBackground>
			<Stack
				width="calc(100vw - 308px)"
				minWidth="800px"
				height="calc(100vh - 100px)"
				minHeight="600px"
				backgroundColor="Card"
				boxShadow="Medium"
				borderRadius="Large"
				overflow="hidden"
			>
				<Flex
					width="100%"
					height="48px"
					alignItems="center"
					justifyContent="space-between"
					flexShrink={0}
					boxShadow="Inset X Accent"
				>
					<Heading paddingX={3}>
						Import from Sketch
					</Heading>
					<CloseModalButton
						position="relative"
						width="16px"
						padding={2}
						marginRight={2}
						onClick={() => setShowImportModal(false)}
					/>
				</Flex>
				<Flex flexGrow={1}>
					{!showSummary && (
						<>
							<Flex
								alignItems="center"
								justifyContent="center"
								flexGrow={1}
								padding={6}
								overflowY="scroll"
							>
								{showLoading && (
									<Loading />
								)}
								{!showLoading && (
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
								sketchDocumentNames={sketchDocumentNames}
								selectedSketchDocumentIndex={selectedSketchDocumentIndex}
								updateSelectedSketchDocumentIndex={updateSelectedSketchDocumentIndex}
								saveSelectedImportedValues={saveSelectedImportedValues}
								numberOfNewValuesByType={numberOfNewValuesByType}
							/>
						</>
					)}
					{showSummary && (
						<ImportSummary
							numberOfNewValuesByType={numberOfNewValuesByType}
							setShowImportModal={setShowImportModal}
						/>
					)}
				</Flex>
			</Stack>
		</ModalBackground>
	)
}

export { ImportModal }
