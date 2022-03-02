import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Heading, Button, Flex, Text, Stack } from '@intouchg/components'
import { PixelInput } from '../PixelInput'
import { parseLetterSpacing, LETTER_SPACING_MIN, LETTER_SPACING_MAX } from './EditLetterSpacing'
import { createThemeValue } from '../../../store'
import { createUuid } from '@intouchg/utility'

const CreateLetterSpacing = ({
	setCreating,
	setSelectedId,
}: {
	setCreating: (creating: boolean) => void
	setSelectedId: (id: string | null) => void
}) => {
	const dispatch = useDispatch()
	const [ value, setValue ] = useState('1')

	const createLetterSpacing = () => {
		const id = createUuid()

		dispatch(createThemeValue({
			type: 'letterSpacing',
			id,
			value: parseLetterSpacing(value),
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
					New letter spacing
				</Heading>
				<Flex
					alignItems="center"
					justifyContent="space-between"
					marginTop={1}
					marginBottom={4}
				>
					<Text>
						letterSpacing
					</Text>
					<PixelInput
						min={LETTER_SPACING_MIN}
						max={LETTER_SPACING_MAX}
						value={value}
						onChange={(event) => setValue(event.target.value)}
						onBlur={(event) => setValue(event.target.value)}
					/>
				</Flex>
			</Stack>
			<Button
				flexShrink={0}
				marginBottom={2}
				onClick={createLetterSpacing}
			>
				Create
			</Button>
		</>
	)
}

export { CreateLetterSpacing }
