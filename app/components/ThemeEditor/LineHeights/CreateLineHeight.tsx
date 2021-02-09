import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Heading, Button, Flex, Text } from '@i/components'
import { PixelInput } from '../PixelInput'
import { parseLineHeight, LINE_HEIGHT_MIN, LINE_HEIGHT_MAX } from './EditLineHeight'
import { createThemeValue } from '../../../store'
import { createUuid } from '@i/utility'

const CreateLineHeight = ({
	setCreating,
	setSelectedId,
}: {
	setCreating: (creating: boolean) => void
	setSelectedId: (id: string | null) => void
}) => {
	const dispatch = useDispatch()
	const [ value, setValue ] = useState('16')

	const createLineHeight = () => {
		const id = createUuid()

		dispatch(createThemeValue({
			type: 'lineHeight',
			id,
			value: parseLineHeight(value),
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
				New line height
			</Heading>
			<Flex
				alignItems="center"
				justifyContent="space-between"
				marginTop={1}
				marginBottom={4}
			>
				<Text>
					lineHeight
				</Text>
				<PixelInput
					min={LINE_HEIGHT_MIN}
					max={LINE_HEIGHT_MAX}
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
				onClick={createLineHeight}
			>
				Create
			</Button>
		</>
	)
}

export { CreateLineHeight }
