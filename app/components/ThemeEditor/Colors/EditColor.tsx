import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SketchPicker } from 'react-color'
import { Box, Input } from '@i/components'
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
				marginTop={1}
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
	)
}

export { EditColor }
