import React from 'react'
import styled from 'styled-components'
import { Stack, Box, Flex, Text } from '@i/components'
import { InvisibleButton, PrimaryButton } from '../Buttons'
import { AccentText, SecondaryText } from '../Texts'
import { CloseModalButton } from '../CloseModalButton'
import { Checkbox } from '../Checkbox'
import { routes, routeTitles } from './index'
import type { ImportModalRoute } from './index'

const SaturationFlex = styled(Flex)<{ isSelectedForImport: boolean }>`
	filter: saturate(${(props) => props.isSelectedForImport ? '1' : '0'});
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
			opacity={isSelectedForImport ? '1' : '0.5'}
			onClick={() => setActiveRoute(route)}
		>
			<SecondaryText fontWeight={isSelectedForImport ? 'Bold' : 'Medium'}>
				{routeTitles[route]}
			</SecondaryText>
			<SaturationFlex
				isSelectedForImport={isSelectedForImport}
				marginRight={2}
			>
				{isSelectedForImport && numberOfSelectedNewValues > 0 && (
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

const ImportButton = styled(PrimaryButton)<{ enabled: boolean }>`
	position: absolute;
	bottom: 0;
	width: calc(100% - 40px);
	margin: 20px;
	${(props) => props.enabled ? `
		pointer-events: unset;
		opacity: 1;
	` : `
		pointer-events: none;
		opacity: 0.5;
	`}
`

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
	let numberOfSelectedValues = 0

	Object.entries(numberOfNewValuesByType).forEach(([ key, object ]) => {
		if (selectedImportCategories.includes(key as any)) {
			Object.values(object).forEach((v) => numberOfSelectedValues += v)
		}
	})

	const selectAllImportCategories = () => setSelectedImportCategories([ ...routes ])
	const unselectAllImportCategories = () => setSelectedImportCategories([])

	const toggleSelectedImportCategory = (route: ImportModalRoute) => {
		setSelectedImportCategories((state) => state.includes(route) ? state.filter((r) => r !== route) : [ ...state, route ])
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
				<Flex
					marginTop={6}
					marginBottom={4}
					justifyContent="center"
				>
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
				</Flex>
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
				<ImportButton
					enabled={selectedImportCategories.length > 0 && numberOfSelectedValues > 0}
					onClick={saveSelectedImportedValues}
				>
					Import
				</ImportButton>
			</Stack>
		</Box>
	)
}

export { RightToolbar }
