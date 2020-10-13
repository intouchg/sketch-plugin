import React, { useState } from 'react'
import { Stack, Box, Text, Flex } from '@i/components'
import { AccentText, InvisibleButton, CloseIcon, PrimaryButton } from '../index'
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
	<Box backgroundColor={isActiveRoute ? 'white' : 'transparent'}>
		<InvisibleButton onClick={() => toggleSelectedImportCategory(route)}>
			<Box
				width="30px"
				height="30px"
				backgroundColor={isSelectedForImport ? 'green' : 'red'}
			/>
		</InvisibleButton>
		<InvisibleButton onClick={() => setRoute(route)}>
			<Text variant="Secondary">
				{route}
			</Text>
		</InvisibleButton>
	</Box>
)

const RightToolbar = ({
	route,
	setRoute,
	closeImportModal,
	sketchDocumentNames,
	selectedSketchDocumentIndex,
	setSelectedSketchDocumentIndex,
}: {
	route: ImportModalRoute
	setRoute: (route: ImportModalRoute) => void
	closeImportModal: () => void
	sketchDocumentNames: string[]
	selectedSketchDocumentIndex: number
	setSelectedSketchDocumentIndex: (index: number) => void
}) => {
	const [ selectedImportCategories, setSelectedImportCategories ] = useState<ImportModalRoute[]>([])

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
