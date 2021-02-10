import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Heading, Button, Flex, Text } from '@i/components'
import { PixelInput } from '../PixelInput'
import { parseShadowX, SHADOW_X_MIN, SHADOW_X_MAX, parseShadowY, SHADOW_Y_MIN, SHADOW_Y_MAX, parseShadowBlur, SHADOW_BLUR_MIN, SHADOW_BLUR_MAX, parseShadowSpread, SHADOW_SPREAD_MIN, SHADOW_SPREAD_MAX } from './EditShadow'
import { createThemeValue } from '../../../store'
import { createUuid } from '@i/utility'

const CreateShadow = ({
	setCreating,
	setSelectedId,
}: {
	setCreating: (creating: boolean) => void
	setSelectedId: (id: string | null) => void
}) => {
	const dispatch = useDispatch()
	const [ x, setX ] = useState('1')
	const [ y, setY ] = useState('1')
	const [ blur, setBlur ] = useState('1')
	const [ spread, setSpread ] = useState('1')

	const createShadow = () => {
		const id = createUuid()

		dispatch(createThemeValue({
			type: 'shadow',
			id,
			value: `${parseShadowX(x)} ${parseShadowY(y)} ${parseShadowBlur(blur)} ${parseShadowSpread(spread)} `,
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
				New shadow
			</Heading>
			<Flex
				alignItems="center"
				justifyContent="space-between"
				marginTop={1}
				marginBottom={4}
			>
				<Text>
					x
				</Text>
				<PixelInput
					min={SHADOW_X_MIN}
					max={SHADOW_X_MAX}
					value={x}
					onChange={(event) => setX(event.target.value)}
					onBlur={(event) => setX(event.target.value)}
				/>
			</Flex>
			<Button
				position="absolute"
				bottom="0"
				left="0"
				right="0"
				marginX={3}
				marginBottom={4}
				onClick={createShadow}
			>
				Create
			</Button>
		</>
	)
}

export { CreateShadow }
