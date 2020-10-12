import React from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button, Input } from '@i/components'
import { createThemeGroup } from '../../../store'
import { themeEditorLeftNavWidth } from '../index'
import { colorEditorRightNavWidth } from './index'

const ColorToolbar = ({
	colorSearchString,
	searchColors,
}: {
	colorSearchString: string
	searchColors: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
	const dispatch = useDispatch()

	const createColorGroup = () => {
		dispatch(createThemeGroup({ groupType: 'color' }))
	}

	return (
		<Box
			width={1}
			marginTop={1}
			paddingLeft={themeEditorLeftNavWidth}
			paddingRight={colorEditorRightNavWidth}
		>
			<Input
				padding={2}
				border="1px solid"
				borderColor="grey.3"
				borderRadius="small"
				type="text"
				placeholder="Search"
				value={colorSearchString}
				onChange={searchColors}
			/>
			<Button
				padding={1}
				marginLeft={4}
				color="green"
				backgroundColor="white"
				hoverColor="white"
				hoverBackgroundColor="green"
				activeColor="white"
				border="2px solid"
				borderColor="green"
				onClick={createColorGroup}
			>
				New Color Group
			</Button>
		</Box>
	)
}

export { ColorToolbar }
