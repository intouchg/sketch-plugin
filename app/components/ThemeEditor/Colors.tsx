import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SketchPicker } from 'react-color'
import { Box, Stack, Input, Button } from '@i/components'
import { Color } from '../ThemeValues'
import { ColorGrid } from '../ColorGrid'
import { NewButton } from './NewButton'
import { topToolbarHeight } from '../TopToolbar'
import { updateThemeValue } from '../../store'
import type { ThemeColor } from '@i/theme'

const ColorsToolbar = ({
	color,
}: {
	color: ThemeColor | null
}) => {
	const dispatch = useDispatch()
	const [ name, setName ] = useState('')
	const [ value, setValue ] = useState('')

	useEffect(() => {
		if (color) {
			setName(color.name)
			setValue(color.value)
		}
	}, [ color ])

	return (
		<Stack
			width="236px"
			height={`calc(100vh - ${topToolbarHeight})`}
			flexShrink={0}
			padding={3}
			backgroundColor="Card"
			overflow="scroll"
		>
			{color && (
				<>
					<Input
						borderColor="Accent"
						borderStyle="solid"
						paddingY="12px"
						marginBottom={4}
						value={name}
						onChange={(event) => setName(event.target.value)}
						onBlur={(event) => dispatch(updateThemeValue({ ...color, name: event.target.value }))}
					/>
					<Box fontFamily="Avenir Next">
						<SketchPicker
							styles={{
								default: {
									picker: {
										width: '100%',
										padding: 0,
										border: 0,
										fontFamily: 'inherit',
										boxShadow: 'none',
									},
								},
							}}
							color={value}
							presetColors={[]}
							onChange={(data) => setValue(data.hex)}
							onChangeComplete={(data) => dispatch(updateThemeValue({ ...color, value: data.hex }))}
						/>
					</Box>
				</>
			)}
		</Stack>
	)
}

const Colors = () => {
	const colors = useSelector((state) => state.theme.values.colors)
	const [ selectedId, setSelectedId ] = useState<string | null>(null)
	const selectedColor = selectedId ? colors.find((c) => c.id === selectedId)! : null

	return (
		<>
			<Box
				display="flex"
				width="100%"
				height={`calc(100vh - ${topToolbarHeight})`}
				overflow="scroll"
			>
				<ColorGrid
					flexGrow={1}
					maxWidth="860px"
					margin="auto"
					gridGap={3}
					padding={6}
				>
					{colors.map((color) => (
						<Button
							invisible
							key={color.id}
							position="relative"
							height="0"
							paddingBottom="100%"
							backgroundColor={color.id === selectedId ? 'Primary Light' : 'transparent'}
							borderRadius="Medium"
							flexGrow={1}
							onClick={() => setSelectedId(color.id)}
						>
							<Color
								selected={color.id === selectedId}
								{...color}
							/>
						</Button>
					))}
				</ColorGrid>
				<NewButton
					active={false}
					onClick={() => {}}
				/>
			</Box>
			<ColorsToolbar color={selectedColor} />
		</>
	)
}

export { Colors }
