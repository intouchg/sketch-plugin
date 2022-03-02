import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Heading, Button, Flex, Text, Stack } from '@intouchg/components'
import { PixelInput } from '../PixelInput'
import { parseRadius, RADIUS_MIN, RADIUS_MAX } from './EditRadius'
import { createThemeValue } from '../../../store'
import { createUuid } from '@intouchg/utility'

const CreateRadius = ({
	setCreating,
	setSelectedId,
}: {
	setCreating: (creating: boolean) => void
	setSelectedId: (id: string | null) => void
}) => {
	const dispatch = useDispatch()
	const [ value, setValue ] = useState('1')

	const createRadius = () => {
		const id = createUuid()

		dispatch(createThemeValue({
			type: 'radius',
			id,
			value: parseRadius(value),
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
					New radius
				</Heading>
				<Flex
					alignItems="center"
					justifyContent="space-between"
					marginTop={1}
					marginBottom={4}
				>
					<Text>
						radius
					</Text>
					<PixelInput
						min={RADIUS_MIN}
						max={RADIUS_MAX}
						value={value}
						onChange={(event) => setValue(event.target.value)}
						onBlur={(event) => setValue(event.target.value)}
					/>
				</Flex>
			</Stack>
			<Button
				flexShrink={0}
				marginBottom={2}
				onClick={createRadius}
			>
				Create
			</Button>
		</>
	)
}

export { CreateRadius }
