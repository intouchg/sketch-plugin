import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Heading, Input, Button, Text, Stack, Box } from '@intouchg/components'
import { ColorPicker } from '../../ColorPicker'
import { createThemeValue } from '../../../store'
import { createUuid, titleCase } from '@intouchg/utility'

const MISSING_COLOR_NAME_ERROR = 'Input a color name to create a new color.'
const DUPLICATE_NAME_ERROR = 'This color name is already in use.'

const CreateColor = ({
	setCreating,
	setSelectedId,
}: {
	setCreating: (creating: boolean) => void
	setSelectedId: (id: string | null) => void
}) => {
	const dispatch = useDispatch()
	const colors = useSelector((state) => state.theme.values.colors)
	const [ name, setName ] = useState('')
	const [ value, setValue ] = useState('#000000')
	const [ error, setError ] = useState('')

	const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (error === MISSING_COLOR_NAME_ERROR || error === DUPLICATE_NAME_ERROR) {
			setError('')
		}

		setName(titleCase(event.target.value))
	}

	const createColor = () => {
		const duplicateNameColor = colors.find((color) => color.name === name)

		if (!name) {
			return setError(MISSING_COLOR_NAME_ERROR)
		}

		if (duplicateNameColor) {
			return setError(DUPLICATE_NAME_ERROR)
		}

		const id = createUuid()

		dispatch(createThemeValue({
			type: 'color',
			id,
			name,
			value,
		}))

		setCreating(false)
		setSelectedId(id)
	}

	return (
		<>
			<Stack
				flexShrink={0}
				flexGrow={1}
			>
				<Heading
					marginTop={2}
					marginBottom={3}
				>
					New color
				</Heading>
				<Stack
					marginTop={1}
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
						placeholder="Color Name"
						value={name}
						onChange={updateName}
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
					/>
				</Box>
			</Stack>
			<Button
				flexShrink={0}
				marginBottom={2}
				onClick={createColor}
			>
				Create
			</Button>
		</>
	)
}

export { CreateColor }
