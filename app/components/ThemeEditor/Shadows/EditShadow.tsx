import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text, Box, Button, Checkbox, Heading } from '@i/components'
import { PixelInput } from '../PixelInput'
import { ColorPicker } from '../../ColorPicker'
import { Icon } from '../../Icon'
import { updateThemeValue } from '../../../store'
import type { ThemeValue, ThemeShadow } from '@i/theme'

export const SHADOW_X_MIN = -100
export const SHADOW_X_MAX = 100
export const SHADOW_X_PRECISION = 0
export const SHADOW_Y_MIN = -100
export const SHADOW_Y_MAX = 100
export const SHADOW_Y_PRECISION = 0
export const SHADOW_BLUR_MIN = 0
export const SHADOW_BLUR_MAX = 9999
export const SHADOW_BLUR_PRECISION = 0
export const SHADOW_SPREAD_MIN = -100
export const SHADOW_SPREAD_MAX = 100
export const SHADOW_SPREAD_PRECISION = 0

export const parseShadowX = (value: string) => `${parseFloat(Number(value).toFixed(SHADOW_X_PRECISION))}px`
export const parseShadowY = (value: string) => `${parseFloat(Number(value).toFixed(SHADOW_Y_PRECISION))}px`
export const parseShadowBlur = (value: string) => `${parseFloat(Number(value).toFixed(SHADOW_BLUR_PRECISION))}px`
export const parseShadowSpread = (value: string) => `${parseFloat(Number(value).toFixed(SHADOW_SPREAD_PRECISION))}px`

const EditShadow = ({
	shadow,
	setDeleteValue,
}: {
    shadow: ThemeShadow
	setDeleteValue: React.Dispatch<React.SetStateAction<ThemeValue | null>>
}) => {
	const dispatch = useDispatch()
	const [ inset, setInset ] = useState(false)
	const [ x, setX ] = useState('')
	const [ y, setY ] = useState('')
	const [ blur, setBlur ] = useState('')
	const [ spread, setSpread ] = useState('')
	const [ color, setColor ] = useState('')

	useEffect(() => {
		if (shadow) {
			let shadowString = shadow.value

			if (shadowString.includes('inset')) {
				setInset(true)
				shadowString = shadowString.replace('inset ', '')
			}
			else {
				setInset(false)
			}

			const [ x, y, blur, spread, color ] = shadowString.split('px').map((s) => s.trim())

			setX(x)
			setY(y)
			setBlur(blur)
			setSpread(spread)
			setColor(color)
		}
	}, [ shadow ])

	const updateShadow = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>, key: 'x' | 'y' | 'blur' | 'spread') => {
		dispatch(updateThemeValue({
			...shadow,
			value: `${inset ? 'inset ' : ''}${parseShadowX(key === 'x' ? value : x)} ${parseShadowY(key === 'y' ? value : y)} ${parseShadowBlur(key === 'blur' ? value : blur)} ${parseShadowSpread(key === 'spread' ? value : spread)} ${color}`,
		}))
	}

	const updateShadowInset = (inset: boolean) => {
		dispatch(updateThemeValue({
			...shadow,
			value: `${inset ? 'inset ' : ''}${parseShadowX(x)} ${parseShadowY(y)} ${parseShadowBlur(blur)} ${parseShadowSpread(spread)} ${color}`,
		}))
	}

	const updateShadowColor = (value: string) => {
		dispatch(updateThemeValue({
			...shadow,
			value: `${inset ? 'inset ' : ''}${parseShadowX(x)} ${parseShadowY(y)} ${parseShadowBlur(blur)} ${parseShadowSpread(spread)} ${value}`,
		}))
	}

	return (
		<>
			<Heading
				marginTop={2}
				marginBottom={3}
			>
				{shadow.name}
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
			<Box flexGrow={1}>
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
						onChange={() => updateShadowInset(!inset)}
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
						onBlur={(event) => updateShadow(event, 'x')}
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
						onBlur={(event) => updateShadow(event, 'y')}
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
						onBlur={(event) => updateShadow(event, 'blur')}
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
						onBlur={(event) => updateShadow(event, 'spread')}
					/>
				</Flex>
				<Box
					marginY={2}
					marginBottom={4}
				>
					<ColorPicker
						color={color}
						onChange={(value) => setColor(value)}
						onChangeComplete={updateShadowColor}
					/>
				</Box>
			</Box>
			<Button
				invisible
				flexShrink={0}
				alignSelf="flex-end"
				paddingBottom={3}
				onClick={() => setDeleteValue(shadow)}
			>
				<Text
					color="Critical"
					fontSize={2}
					fontWeight={3}
				>
					Delete
				</Text>
			</Button>
		</>
	)
}

export { EditShadow }
