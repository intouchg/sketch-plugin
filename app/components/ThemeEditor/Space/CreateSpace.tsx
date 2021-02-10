import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Heading, Button, Flex, Text, Stack } from '@i/components'
import { PixelInput } from '../PixelInput'
import { parseSpace, SPACE_MIN, SPACE_MAX } from './EditSpace'
import { createThemeValue } from '../../../store'
import { createUuid } from '@i/utility'

const CreateSpace = ({
	setCreating,
	setSelectedId,
}: {
	setCreating: (creating: boolean) => void
	setSelectedId: (id: string | null) => void
}) => {
	const dispatch = useDispatch()
	const [ value, setValue ] = useState('1')

	const createSpace = () => {
		const id = createUuid()

		dispatch(createThemeValue({
			type: 'space',
			id,
			value: parseSpace(value),
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
					New space
				</Heading>
				<Flex
					alignItems="center"
					justifyContent="space-between"
					marginTop={1}
					marginBottom={4}
				>
					<Text>
						space
					</Text>
					<PixelInput
						min={SPACE_MIN}
						max={SPACE_MAX}
						value={value}
						onChange={(event) => setValue(event.target.value)}
						onBlur={(event) => setValue(event.target.value)}
					/>
				</Flex>
			</Stack>
			<Button
				flexShrink={0}
				marginBottom={2}
				onClick={createSpace}
			>
				Create
			</Button>
		</>
	)
}

export { CreateSpace }
