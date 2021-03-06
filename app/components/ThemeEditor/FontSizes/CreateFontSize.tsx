import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Heading, Button, Flex, Text, Stack } from '@intouchg/components'
import { PixelInput } from '../PixelInput'
import { parseFontSize, FONT_SIZE_MIN, FONT_SIZE_MAX } from './EditFontSize'
import { createThemeValue } from '../../../store'
import { createUuid } from '@intouchg/utility'

const CreateFontSize = ({
	setCreating,
	setSelectedId,
}: {
	setCreating: (creating: boolean) => void
	setSelectedId: (id: string | null) => void
}) => {
	const dispatch = useDispatch()
	const [ value, setValue ] = useState('16')

	const createFontSize = () => {
		const id = createUuid()

		dispatch(createThemeValue({
			type: 'fontSize',
			id,
			value: parseFontSize(value),
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
					New font size
				</Heading>
				<Flex
					alignItems="center"
					justifyContent="space-between"
					marginTop={1}
					marginBottom={4}
				>
					<Text>
						fontSize
					</Text>
					<PixelInput
						min={FONT_SIZE_MIN}
						max={FONT_SIZE_MAX}
						value={value}
						onChange={(event) => setValue(event.target.value)}
						onBlur={(event) => setValue(event.target.value)}
					/>
				</Flex>
			</Stack>
			<Button
				flexShrink={0}
				marginBottom={2}
				onClick={createFontSize}
			>
				Create
			</Button>
		</>
	)
}

export { CreateFontSize }
