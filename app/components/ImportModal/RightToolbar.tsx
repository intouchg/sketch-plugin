import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Stack, Box, Flex, Text } from '@i/components'
import { InvisibleButton, PrimaryButton } from '../Buttons'
import { AccentText, SecondaryText } from '../Texts'
import { CloseModalButton } from '../CloseModalButton'
import { Checkbox } from '../Checkbox'
import { routes, routeTitles } from './index'
import { setBannerState } from '../../store'
import type { ImportModalRoute } from './index'

const SaturationFlex = styled(Flex)<{ desaturate: boolean }>`
	filter: saturate(${(props) => props.desaturate ? '0' : '1'});
`

const CheckboxNavLink = ({
	route,
	setActiveRoute,
	toggleSelectedImportCategory,
	isActiveRoute,
	isSelectedForImport,
	numberOfSelectedNewValues,
}: {
	route: ImportModalRoute
	setActiveRoute: React.Dispatch<React.SetStateAction<ImportModalRoute>>
	toggleSelectedImportCategory: (route: ImportModalRoute) => void
	isActiveRoute: boolean
	isSelectedForImport: boolean
	numberOfSelectedNewValues: number
}) => (
	<Flex
		paddingX={2}
		marginBottom={1}
		backgroundColor={isActiveRoute ? 'white' : 'transparent'}
	>
		<Box margin={2}>
			<Checkbox
				checked={isSelectedForImport}
				onClick={() => toggleSelectedImportCategory(route)}
			/>
		</Box>
		<Flex
			as={InvisibleButton}
			alignItems="center"
			justifyContent="space-between"
			width="100%"
			paddingY={2}
			textAlign="left"
			onClick={() => setActiveRoute(route)}
		>
			<SecondaryText fontWeight={isSelectedForImport ? 'Bold' : 'Medium'}>
				{routeTitles[route]}
			</SecondaryText>
			<SaturationFlex
				desaturate={!isSelectedForImport || numberOfSelectedNewValues === 0}
				marginRight={2}
			>
				{(isSelectedForImport || numberOfSelectedNewValues > 0) && (
					<Flex
						alignItems="center"
						justifyContent="center"
						backgroundColor="Positive"
						borderRadius="Medium"
						marginLeft={1}
					>
						<Text
							fontSize={1}
							lineHeight={1}
							paddingX={2}
							paddingY={1}
							color="Positive Dark"
							fontWeight="Demibold"
						>
							{numberOfSelectedNewValues}
						</Text>
					</Flex>
				)}
			</SaturationFlex>
		</Flex>
	</Flex>
)

const RightToolbar = ({
	activeRoute,
	setActiveRoute,
	selectedImportCategories,
	setSelectedImportCategories,
	setShowImportModal,
	sketchDocumentNames,
	selectedSketchDocumentIndex,
	updateSelectedSketchDocumentIndex,
	saveSelectedImportedValues,
	numberOfNewValuesByType,
}: {
	activeRoute: ImportModalRoute
	setActiveRoute: React.Dispatch<React.SetStateAction<ImportModalRoute>>
	selectedImportCategories: ImportModalRoute[]
	setSelectedImportCategories: React.Dispatch<React.SetStateAction<ImportModalRoute[]>>
	setShowImportModal: React.Dispatch<React.SetStateAction<boolean>>
	sketchDocumentNames: string[]
	selectedSketchDocumentIndex: number
	updateSelectedSketchDocumentIndex: (index: number) => void
	saveSelectedImportedValues: () => void
	numberOfNewValuesByType: { [key in ImportModalRoute]: number }
}) => {
	const dispatch = useDispatch()

	let numberOfSelectedValues = 0

	Object.entries(numberOfNewValuesByType).forEach(([ key, numberSelected ]) => {
		if (selectedImportCategories.includes(key as any)) {
			numberOfSelectedValues += numberSelected
		}
	})

	const selectAllImportCategories = () => setSelectedImportCategories([ ...routes ])
	const unselectAllImportCategories = () => setSelectedImportCategories([])

	const toggleSelectedImportCategory = (route: ImportModalRoute) => {
		setSelectedImportCategories((state) => state.includes(route) ? state.filter((r) => r !== route) : [ ...state, route ])
	}

	const importValues = () => {
		if (selectedImportCategories.length > 0 && numberOfSelectedValues > 0) {
			saveSelectedImportedValues()
		}
		else {
			dispatch(setBannerState({ show: true, type: 'error', title: 'No values selected', message: 'Select values to import.' }))
		}
	}

	return (
		<Box
			minWidth="280px"
			backgroundColor="Background"
			borderTopRightRadius="Large"
			borderBottomRightRadius="Large"
		>
			<Stack
				position="relative"
				height="100%"
			>
				<CloseModalButton onClick={() => setShowImportModal(false)} />
				<Stack
					paddingX={3}
					marginTop={6}
					marginBottom={4}
				>
					<AccentText marginBottom={2}>
						Sketch Document
					</AccentText>
					<select
						value={selectedSketchDocumentIndex}
						style={{ fontSize: '1.5rem' }}
						onChange={(event) => updateSelectedSketchDocumentIndex(parseInt(event.target.value, 10))}
					>
						{sketchDocumentNames.map((name, index) => (
							<option
								key={name}
								value={index}
							>
								{name}
							</option>
						))}
					</select>
				</Stack>
				<InvisibleButton
					marginLeft={3}
					marginBottom={2}
					textAlign="left"
					onClick={selectedImportCategories.length ? unselectAllImportCategories : selectAllImportCategories}
				>
					<AccentText color="Primary">
						{selectedImportCategories.length ? 'Unselect' : 'Select'} All
					</AccentText>
				</InvisibleButton>
				{routes.map((route) => (
					<CheckboxNavLink
						key={route}
						route={route}
						setActiveRoute={setActiveRoute}
						toggleSelectedImportCategory={toggleSelectedImportCategory}
						isActiveRoute={route === activeRoute}
						isSelectedForImport={selectedImportCategories.includes(route)}
						numberOfSelectedNewValues={numberOfNewValuesByType[route]}
					/>
				))}
				<PrimaryButton
					position="absolute"
					bottom="0"
					width="calc(100% - 40px)"
					margin="20px"
					onClick={importValues}
				>
					Import
				</PrimaryButton>
			</Stack>
		</Box>
	)
}

export { RightToolbar }
