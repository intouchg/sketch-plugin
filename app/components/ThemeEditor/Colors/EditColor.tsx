import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button, Text, Heading } from '@intouchg/components'
import { ColorPicker } from '../../ColorPicker'
import { updateThemeValue } from '../../../store'
import type { ThemeValue, ThemeColor } from '@intouchg/theme'

const EditColor = ({
	color,
	setDeleteValue,
}: {
    color: ThemeColor
	setDeleteValue: React.Dispatch<React.SetStateAction<ThemeValue | null>>
}) => {
	const dispatch = useDispatch()
	const [ value, setValue ] = useState('')
	const [ error, setError ] = useState('')

	useEffect(() => {
		if (color) {
			setValue(color.value)
			setError('')
		}
	}, [ color ])

	return (
		<>
			<Box flexGrow={1}>
				<Heading
					marginTop={2}
					marginBottom={4}
				>
					{color.name}
				</Heading>
				<Box marginBottom={4}>
					<ColorPicker
						color={value}
						onChange={(value) => setValue(value)}
						onChangeComplete={(value) => dispatch(updateThemeValue({ ...color, value }))}
					/>
				</Box>
			</Box>
			<Button
				invisible
				flexShrink={0}
				alignSelf="flex-end"
				paddingBottom={3}
				onClick={() => setDeleteValue(color)}
			>
				<Text
					color="Critical"
					fontSize={2}
					fontWeight={3}
				>
					Delete
				</Text>
			</Button>
		</>
	)
}

export { EditColor }
