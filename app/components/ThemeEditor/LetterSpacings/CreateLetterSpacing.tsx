import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Heading, Button, Flex, Text } from '@i/components'
import { PixelInput } from '../PixelInput'
import { parseLetterSpacing, LETTER_SPACING_MIN, LETTER_SPACING_MAX } from './EditLetterSpacing'
import { createThemeValue } from '../../../store'
import { createUuid } from '@i/utility'

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
			<Button
				position="absolute"
				bottom="0"
				left="0"
				right="0"
				marginX={3}
				marginBottom={4}
				onClick={createLetterSpacing}
			>
				Create
			</Button>
		</>
	)
}

export { CreateLetterSpacing }
