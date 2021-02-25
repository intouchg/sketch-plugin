import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Input, Box, Button, Text } from '@i/components'
import { ColorPicker } from '../../ColorPicker'
import { updateThemeValue } from '../../../store'
import type { ThemeValue, ThemeColor } from '@i/theme'

const EditColor = ({
	color,
	setDeleteValue,
}: {
    color: ThemeColor
	setDeleteValue: React.Dispatch<React.SetStateAction<ThemeValue | null>>
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
		<>
			<Box flexGrow={1}>
				<Input
					borderColor="Accent"
					borderStyle="solid"
					paddingY="12px"
					marginTop={2}
					marginBottom={4}
					style={{ transform: 'scale3d(1, 1, 1)' }}
					autoCorrect="off"
					autoCapitalize="off"
					autoComplete="off"
					spellCheck="false"
					value={name}
					onChange={(event) => setName(event.target.value)}
					onBlur={(event) => dispatch(updateThemeValue({ ...color, name: event.target.value }))}
				/>
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
