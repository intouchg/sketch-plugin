import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Stack, Text, Button } from '@i/components'
import { colorSwatchProp } from './index'
import { setSelectedColor, deleteThemeValue } from '../../../store'

const ColorSwatch = ({
	id,
	name,
	value,
}: {
	id: string
	name: string
	value: string
}) => {
	const dispatch = useDispatch()
	const selectedColorId = useSelector((state) => state.theme.selectedColor.id)
	const colorBox = useRef(null)
	const [ hovering, setHovering ] = useState(false)
	const updateSelectedColor = (event: React.MouseEvent<HTMLElement>) =>
		colorBox.current === event.target && dispatch(setSelectedColor({ id, value }))
	const updateHovering = (event: React.MouseEvent<HTMLElement>) => setHovering(event.type === 'mouseover')
	const deleteColor = () => dispatch(deleteThemeValue({ id }))

	return (
		<Box padding={4}>
			<Stack>
				<Box
					{...colorSwatchProp}
					ref={colorBox}
					position="relative"
					width={90}
					height={90}
					backgroundColor={value}
					border={hovering || id === selectedColorId ? '6px solid' : '0'}
					borderColor="blue"
					borderRadius="small"
					style={{ cursor: 'pointer' }}
					onClick={updateSelectedColor}
					onMouseOver={updateHovering}
					onMouseLeave={updateHovering}
				>
					{hovering && (
						<Button
							position="absolute"
							top={0}
							right={0}
							width={26}
							height={26}
							borderRadius="100%"
							boxShadow="small"
							color="red"
							backgroundColor="white"
							hoverColor="white"
							hoverBackgroundColor="red"
							activeColor="white"
							border="2px solid"
							borderColor="red"
							style={{ transform: 'translate(50%, -50%)' }}
							onClick={deleteColor}
						>
							x
						</Button>
					)}
				</Box>
				<Text
					fontSize={1}
					paddingTop={2}
				>
					{name}
				</Text>
			</Stack>
		</Box>
	)
}

export { ColorSwatch }
