import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Input, Box } from '@i/components'
import { ColorPicker } from '../../ColorPicker'
import { updateThemeValue } from '../../../store'
import type { ThemeColor } from '@i/theme'

const EditColor = ({
	color,
}: {
    color: ThemeColor
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
					presetColors={[]}
					onChange={(data) => setValue(data.hex)}
					onChangeComplete={(data) => dispatch(updateThemeValue({ ...color, value: data.hex }))}
				/>
			</Box>
		</>
	)
}

export { EditColor }
