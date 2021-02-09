import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Heading, Button, Flex, Text } from '@i/components'
import { PixelInput } from '../PixelInput'
import { parseBorderWidth, BORDER_WIDTH_MIN, BORDER_WIDTH_MAX } from './EditBorderWidth'
import { createThemeValue } from '../../../store'
import { createUuid } from '@i/utility'

const CreateBorderWidth = ({
	setCreating,
	setSelectedId,
}: {
	setCreating: (creating: boolean) => void
	setSelectedId: (id: string | null) => void
}) => {
	const dispatch = useDispatch()
	const [ value, setValue ] = useState('1')

	const createBorderWidth = () => {
		const id = createUuid()

		dispatch(createThemeValue({
			type: 'borderWidth',
			id,
			value: parseBorderWidth(value),
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
				New border width
			</Heading>
			<Flex
				alignItems="center"
				justifyContent="space-between"
				marginTop={1}
				marginBottom={4}
			>
				<Text>
					borderWidth
				</Text>
				<PixelInput
					min={BORDER_WIDTH_MIN}
					max={BORDER_WIDTH_MAX}
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
				onClick={createBorderWidth}
			>
				Create
			</Button>
		</>
	)
}

export { CreateBorderWidth }
