import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Heading, Button, Flex, Text, Stack, Box, Checkbox } from '@intouchg/components'
import { PixelInput } from '../PixelInput'
import { ColorPicker } from '../../ColorPicker'
import { Icon } from '../../Icon'
import { parseShadowX, SHADOW_X_MIN, SHADOW_X_MAX, parseShadowY, SHADOW_Y_MIN, SHADOW_Y_MAX, parseShadowBlur, SHADOW_BLUR_MIN, SHADOW_BLUR_MAX, parseShadowSpread, SHADOW_SPREAD_MIN, SHADOW_SPREAD_MAX } from './EditShadow'
import { createThemeValue } from '../../../store'
import { createUuid } from '@intouchg/utility'

const CreateShadow = ({
	setCreating,
	setSelectedId,
}: {
	setCreating: (creating: boolean) => void
	setSelectedId: (id: string | null) => void
}) => {
	const dispatch = useDispatch()
	const [ inset, setInset ] = useState(false)
	const [ x, setX ] = useState('1')
	const [ y, setY ] = useState('1')
	const [ blur, setBlur ] = useState('1')
	const [ spread, setSpread ] = useState('1')
	const [ color, setColor ] = useState('#000000')

	const createShadow = () => {
		const id = createUuid()

		dispatch(createThemeValue({
			type: 'shadow',
			id,
			value: `${inset ? 'inset ' : ''}${parseShadowX(x)} ${parseShadowY(y)} ${parseShadowBlur(blur)} ${parseShadowSpread(spread)} ${color}`,
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
				position="absolute"
				top="60px"
				right="0"
				left="0"
				width="100%"
				height="208px"
				flexShrink={0}
				backgroundColor="Background"
				alignItems="center"
				justifyContent="center"
				borderTop="1px solid"
				borderBottom="1px solid"
				borderColor="Accent"
				overflow="hidden"
			>
				<Box
					width="128px"
					height="128px"
					backgroundColor="Card"
					boxShadow={`${inset ? 'inset ' : ''}${parseShadowX(x)} ${parseShadowY(y)} ${parseShadowBlur(blur)} ${parseShadowSpread(spread)} ${color}`}
				/>
			</Flex>
			<Stack
				flexShrink={0}
				flexGrow={1}
			>
				<Flex
					flexShrink={0}
					alignItems="center"
					justifyContent="space-between"
					marginY={2}
					marginTop="240px"
				>
					<Text>
						inset
					</Text>
					<Checkbox
						margin={2}
						flexShrink={0}
						icon={
							<Icon
								icon="CheckmarkIcon"
								padding="2px"
							/>
						}
						checked={inset}
						onChange={() => setInset((i) => !i)}
					/>
				</Flex>
				<Flex
					flexShrink={0}
					alignItems="center"
					justifyContent="space-between"
					marginY={2}
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
				<Flex
					flexShrink={0}
					alignItems="center"
					justifyContent="space-between"
					marginY={2}
				>
					<Text>
						y
					</Text>
					<PixelInput
						min={SHADOW_Y_MIN}
						max={SHADOW_Y_MAX}
						value={y}
						onChange={(event) => setY(event.target.value)}
						onBlur={(event) => setY(event.target.value)}
					/>
				</Flex>
				<Flex
					flexShrink={0}
					alignItems="center"
					justifyContent="space-between"
					marginY={2}
				>
					<Text>
						blur
					</Text>
					<PixelInput
						min={SHADOW_BLUR_MIN}
						max={SHADOW_BLUR_MAX}
						value={blur}
						onChange={(event) => setBlur(event.target.value)}
						onBlur={(event) => setBlur(event.target.value)}
					/>
				</Flex>
				<Flex
					flexShrink={0}
					alignItems="center"
					justifyContent="space-between"
					marginY={2}
					marginBottom={4}
				>
					<Text>
						spread
					</Text>
					<PixelInput
						min={SHADOW_SPREAD_MIN}
						max={SHADOW_SPREAD_MAX}
						value={spread}
						onChange={(event) => setSpread(event.target.value)}
						onBlur={(event) => setSpread(event.target.value)}
					/>
				</Flex>
				<Box
					marginY={2}
					marginBottom={4}
				>
					<ColorPicker
						color={color}
						onChange={(value) => setColor(value)}
						onChangeComplete={(value) => setColor(value)}
					/>
				</Box>
			</Stack>
			<Button
				flexShrink={0}
				marginBottom={2}
				onClick={createShadow}
			>
				Create
			</Button>
		</>
	)
}

export { CreateShadow }
