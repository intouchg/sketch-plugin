import React, { useState } from 'react'
import { Stack, Box, Text } from '@i/components'
import { AccentText, InvisibleButton, CloseIcon, PrimaryButton } from '../index'
import { routes } from './index'
import type { ImportModalRoute } from './index'

const CheckboxNavLink = ({
	route,
	setRoute,
	toggleSelectedImport,
	isActiveRoute,
	isSelectedImport,
}: {
	route: ImportModalRoute
	setRoute: (route: ImportModalRoute) => void
	toggleSelectedImport: (route: ImportModalRoute) => void
	isActiveRoute: boolean
	isSelectedImport: boolean
}) => (
	<Box backgroundColor={isActiveRoute ? 'white' : 'transparent'}>
		<InvisibleButton onClick={() => toggleSelectedImport(route)}>
			<Box
				width="30px"
				height="30px"
				backgroundColor={isSelectedImport ? 'green' : 'red'}
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
	setSelectedSketchDocumentIndex,
}: {
	route: ImportModalRoute
	setRoute: (route: ImportModalRoute) => void
	closeImportModal: () => void
	sketchDocumentNames: string[]
	setSelectedSketchDocumentIndex: (index: number) => void
}) => {
	const [ selectedImports, setSelectedImports ] = useState<ImportModalRoute[]>([])

	const selectAllImports = () => setSelectedImports([ ...routes ])

	const unselectAllImports = () => setSelectedImports([])

	const toggleSelectedImport = (route: ImportModalRoute) => {
		setSelectedImports((state) => state.includes(route) ? state.filter((r) => r !== route) : [ ...state, route ])
	}

	const upateSketchDocumentIndex = ({ target }: React.ChangeEvent<HTMLSelectElement>) => setSelectedSketchDocumentIndex(parseInt(target.value, 10))

	return (
		<Box
			width="280px"
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
				<select onChange={upateSketchDocumentIndex}>
					{sketchDocumentNames.map((name, index) => (
						<option
							key={name}
							value={index}
						>
							{name}
						</option>
					))}
				</select>
				<InvisibleButton
					paddingTop={4}
					paddingLeft={3}
					textAlign="left"
					onClick={selectedImports.length ? unselectAllImports : selectAllImports}
				>
					<AccentText color="Primary">
						{selectedImports.length ? 'Unselect' : 'Select'} All
					</AccentText>
				</InvisibleButton>
				{routes.map((r) => (
					<CheckboxNavLink
						key={r}
						route={r}
						setRoute={setRoute}
						toggleSelectedImport={toggleSelectedImport}
						isActiveRoute={r === route}
						isSelectedImport={selectedImports.includes(r)}
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
