import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text, Box } from '@i/components'
import { PixelInput } from '../PixelInput'
import { ColorPicker } from '../../ColorPicker'
import { updateThemeValue } from '../../../store'
import type { ColorResult } from 'react-color'
import type { ThemeShadow } from '@i/theme'

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
}: {
    shadow: ThemeShadow
}) => {
	const dispatch = useDispatch()
	const [ x, setX ] = useState('')
	const [ y, setY ] = useState('')
	const [ blur, setBlur ] = useState('')
	const [ spread, setSpread ] = useState('')
	const [ color, setColor ] = useState('')

	useEffect(() => {
		if (shadow) {
			const [ x, y, blur, spread, color ] = shadow.value.split('px').map((s) => s.trim())

			setX(x)
			setY(y)
			setBlur(blur)
			setSpread(spread)
			setColor(color)
		}
	}, [ shadow ])

	const updateShadowX = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateThemeValue({
			...shadow,
			value: `${parseShadowX(event.target.value)} ${parseShadowY(y)} ${parseShadowBlur(blur)} ${parseShadowSpread(spread)} ${color}`,
		}))
	}

	const updateShadowY = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateThemeValue({
			...shadow,
			value: `${parseShadowX(x)} ${parseShadowY(event.target.value)} ${parseShadowBlur(blur)} ${parseShadowSpread(spread)} ${color}`,
		}))
	}

	const updateShadowBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateThemeValue({
			...shadow,
			value: `${parseShadowX(x)} ${parseShadowY(y)} ${parseShadowBlur(event.target.value)} ${parseShadowSpread(spread)} ${color}`,
		}))
	}

	const updateShadowSpread = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateThemeValue({
			...shadow,
			value: `${parseShadowX(x)} ${parseShadowY(y)} ${parseShadowBlur(blur)} ${parseShadowSpread(event.target.value)} ${color}`,
		}))
	}

	const updateShadowColor = (value: string) => {
		dispatch(updateThemeValue({
			...shadow,
			value: `${parseShadowX(x)} ${parseShadowY(y)} ${parseShadowBlur(blur)} ${parseShadowSpread(spread)} ${value}`,
		}))
	}

	return (
		<>
			<Flex
				position="absolute"
				top="0"
				right="0"
				left="0"
				width="100%"
				height="208px"
				flexShrink={0}
				backgroundColor="Background"
				alignItems="center"
				justifyContent="center"
				borderBottomWidth="1px"
				borderBottomStyle="solid"
				borderBottomColor="Accent"
			>
				<Box
					width="128px"
					height="128px"
					backgroundColor="Card"
					boxShadow={`${parseShadowX(x)} ${parseShadowY(y)} ${parseShadowBlur(blur)} ${parseShadowSpread(spread)} ${color}`}
				/>
			</Flex>
			<Flex
				flexShrink={0}
				alignItems="center"
				justifyContent="space-between"
				marginY={2}
				marginTop="224px"
			>
				<Text>
					x
				</Text>
				<PixelInput
					min={SHADOW_X_MIN}
					max={SHADOW_X_MAX}
					value={x}
					onChange={(event) => setX(event.target.value)}
					onBlur={updateShadowX}
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
					onBlur={updateShadowY}
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
					onBlur={updateShadowBlur}
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
					onBlur={updateShadowSpread}
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
		</>
	)
}

export { EditShadow }
