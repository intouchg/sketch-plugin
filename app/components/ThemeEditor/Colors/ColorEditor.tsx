import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChromePicker } from 'react-color'
import { Box, Flex, Text, Button, Input } from '@i/components'
import { updateThemeValue, setSelectedColor } from '../../../store'

const ColorEditor = () => {
	const dispatch = useDispatch()
	const color = useSelector((state) => state.theme.selectedColor)
	const { name, value } = color
	const [ colorValue, setColor ] = useState(value)
	const [ colorName, setColorName ] = useState(name)

	useEffect(() => void setColorName(name), [ name ])

	if (!value) {
		return null
	}

	const updateColor = (colorData: { hex: string }) => setColor(colorData.hex)
	const resetColor = () => setColor(color.value)
	const resetSelectedColor = () => dispatch(setSelectedColor({ id: '', value: '' }))
	const updateColorName = (event: React.ChangeEvent<HTMLInputElement>) => setColorName(event.target.value)

	const commitColorNameUpdate = () => {
		if (colorName !== name) {
			dispatch(updateThemeValue({ ...color, name: colorName }))
		}
	}

	const commitColorUpdate = () => {
		if ((colorValue && colorValue !== value) || colorName !== name) {
			dispatch(updateThemeValue({
				...color,
				name: colorName,
				value: colorValue || value,
			}))
		}
	}

	return (
		<Box
			position="relative"
			height="100%"
			paddingTop={6}
		>
			<Box padding={3}>
				<Input
					width={1}
					backgroundColor="transparent"
					fontWeight={700}
					value={colorName}
					onChange={updateColorName}
					onBlur={commitColorNameUpdate}
				/>
			</Box>
			<Flex
				position="relative"
				top={2}
				flexWrap="wrap"
			>
				<Text
					height={20}
					fontSize={1}
				>
					Current Color
				</Text>
				<Box
					width={180}
					height={90}
					backgroundColor={value}
					style={{ cursor: 'pointer' }}
					onClick={resetColor}
				/>
				{colorValue ? (
					<>
						<Box
							width={180}
							height={90}
							backgroundColor={colorValue}
						/>
						<Text
							height={20}
							fontSize={1}
						>
							New Color
						</Text>
					</>
				) : (
					<Box
						width={180}
						height={110}
					/>
				)}
			</Flex>
			<Box
				position="relative"
				top={4}
				padding={2}
			>
				<ChromePicker
					disableAlpha
					// width="100%"
					color={colorValue}
					onChange={updateColor}
				/>
			</Box>
			<Flex
				position="absolute"
				bottom={0}
				width={1}
				paddingY={3}
			>
				<Button onClick={resetSelectedColor}>
					Cancel
				</Button>
				<Button onClick={commitColorUpdate}>
					Update Color
				</Button>
			</Flex>
		</Box>
	)
}

export { ColorEditor }
