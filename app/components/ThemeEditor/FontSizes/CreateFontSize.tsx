import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Heading, Input, Button } from '@i/components'
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
			value: `${parseFloat((Number(value) / 16).toFixed(4))}rem`,
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
			<Input
				type="number"
				marginTop={1}
				marginBottom={4}
				paddingY="12px"
				style={{ transform: 'scale3d(1, 1, 1)' }}
				autoCorrect="off"
				autoCapitalize="off"
				autoComplete="off"
				spellCheck="false"
				value={value}
				onChange={(event) => setValue(event.target.value)}
			/>
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
