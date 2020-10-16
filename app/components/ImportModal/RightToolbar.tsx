import React from 'react'
import { Stack, Box, Flex } from '@i/components'
import { InvisibleButton, PrimaryButton } from '../Buttons'
import { AccentText, SecondaryText } from '../Texts'
import { CloseIcon } from '../Icons'
import { Checkbox } from '../Checkbox'
import { routes } from './index'
import type { ImportModalRoute } from './index'

const CheckboxNavLink = ({
	route,
	setRoute,
	toggleSelectedImportCategory,
	isActiveRoute,
	isSelectedForImport,
}: {
	route: ImportModalRoute
	setRoute: (route: ImportModalRoute) => void
	toggleSelectedImportCategory: (route: ImportModalRoute) => void
	isActiveRoute: boolean
	isSelectedForImport: boolean
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
		<InvisibleButton
			width="100%"
			paddingY={2}
			textAlign="left"
			onClick={() => setRoute(route)}
		>
			<SecondaryText>
				{route}
			</SecondaryText>
		</InvisibleButton>
	</Flex>
)

const RightToolbar = ({
	route,
	setRoute,
	selectedImportCategories,
	setSelectedImportCategories,
	closeImportModal,
	sketchDocumentNames,
	selectedSketchDocumentIndex,
	setSelectedSketchDocumentIndex,
}: {
	route: ImportModalRoute
	setRoute: (route: ImportModalRoute) => void
	selectedImportCategories: ImportModalRoute[]
	setSelectedImportCategories: React.Dispatch<React.SetStateAction<ImportModalRoute[]>>
	closeImportModal: () => void
	sketchDocumentNames: string[]
	selectedSketchDocumentIndex: number
	setSelectedSketchDocumentIndex: (index: number) => void
}) => {
	const selectAllImportCategories = () => setSelectedImportCategories([ ...routes ])
	const unselectAllImportCategories = () => setSelectedImportCategories([])

	const toggleSelectedImportCategory = (route: ImportModalRoute) => {
		setSelectedImportCategories((state) => state.includes(route) ? state.filter((r) => r !== route) : [ ...state, route ])
	}

	const upateSketchDocumentIndex = ({ target }: React.ChangeEvent<HTMLSelectElement>) => setSelectedSketchDocumentIndex(parseInt(target.value, 10))

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
				<InvisibleButton
					position="absolute"
					top="0"
					right="0"
					padding={2}
					zIndex={4}
					onClick={closeImportModal}
				>
					<CloseIcon
						width="13px"
						fill="Accent"
					/>
				</InvisibleButton>
				<Flex
					marginTop={6}
					marginBottom={4}
					justifyContent="center"
				>
					<select
						value={selectedSketchDocumentIndex}
						onChange={upateSketchDocumentIndex}
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
				{routes.map((r) => (
					<CheckboxNavLink
						key={r}
						route={r}
						setRoute={setRoute}
						toggleSelectedImportCategory={toggleSelectedImportCategory}
						isActiveRoute={r === route}
						isSelectedForImport={selectedImportCategories.includes(r)}
					/>
				))}
				<PrimaryButton
					position="absolute"
					bottom="0"
					width="calc(100% - 40px)"
					margin="20px"
				>
					Import
				</PrimaryButton>
			</Stack>
		</Box>
	)
}

export { RightToolbar }
