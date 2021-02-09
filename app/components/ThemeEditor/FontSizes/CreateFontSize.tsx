import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Heading, Button, Flex, Text } from '@i/components'
import { PixelInput } from '../PixelInput'
import { parseFontSize, FONT_SIZE_MIN, FONT_SIZE_MAX } from './EditFontSize'
import { createThemeValue } from '../../../store'
import { createUuid } from '@i/utility'

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
			<Button
				position="absolute"
				bottom="0"
				left="0"
				right="0"
				marginX={3}
				marginBottom={4}
				onClick={createFontSize}
			>
				Create
			</Button>
		</>
	)
}

export { CreateFontSize }
