import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Box, Button, Text, Stack } from '@i/components'
import { ColorPicker } from '../../ColorPicker'
import { updateThemeValue } from '../../../store'
import { MISSING_COLOR_NAME_ERROR, DUPLICATE_NAME_ERROR } from './CreateColor'
import { titleCase } from '@i/utility'
import type { ThemeValue, ThemeColor } from '@i/theme'

const EditColor = ({
	color,
	setDeleteValue,
}: {
    color: ThemeColor
	setDeleteValue: React.Dispatch<React.SetStateAction<ThemeValue | null>>
}) => {
	const dispatch = useDispatch()
	const colors = useSelector((state) => state.theme.values.colors)
	const [ name, setName ] = useState('')
	const [ value, setValue ] = useState('')
	const [ error, setError ] = useState('')

	useEffect(() => {
		if (color) {
			setName(color.name)
			setValue(color.value)
			setError('')
		}
	}, [ color ])

	const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (error === MISSING_COLOR_NAME_ERROR || error === DUPLICATE_NAME_ERROR) {
			setError('')
		}

		setName(titleCase(event.target.value))
	}

	const commitNameUpdate = () => {
		const duplicateNameColor = colors.find((color) => color.name === name)

		if (!name) {
			return setError(MISSING_COLOR_NAME_ERROR)
		}

		if (duplicateNameColor) {
			return setError(DUPLICATE_NAME_ERROR)
		}

		dispatch(updateThemeValue({ ...color, name }))
	}

	return (
		<>
			<Box flexGrow={1}>
				<Stack
					marginTop={2}
					marginBottom={4}
				>
					<Input
						borderColor={error ? 'Critical' : 'Accent'}
						borderStyle="solid"
						paddingY="12px"
						style={{ transform: 'scale3d(1, 1, 1)' }}
						autoCorrect="off"
						autoCapitalize="off"
						autoComplete="off"
						spellCheck="false"
						value={name}
						onChange={updateName}
						onBlur={commitNameUpdate}
					/>
					{(error === MISSING_COLOR_NAME_ERROR || error === DUPLICATE_NAME_ERROR) && (
						<Text
							paddingTop={2}
							color="Critical"
						>
							{error}
						</Text>
					)}
				</Stack>
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
