import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text } from '@i/components'
import { PixelInput } from '../PixelInput'
import { updateThemeValue } from '../../../store'
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

	useEffect(() => {
		if (shadow) {
			const [ x, y, blur, spread, color ] = shadow.value.split('px').map((s) => s.trim())

			setX(x)
			setY(y)
			setBlur(blur)
			setSpread(spread)
		}
	}, [ shadow ])

	const updateShadowX = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateThemeValue({
			...shadow,
			value: `${parseShadowX(event.target.value)} ${parseShadowY(y)} ${parseShadowBlur(blur)} ${parseShadowSpread(spread)} `,
		}))
	}

	const updateShadowY = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateThemeValue({
			...shadow,
			value: `${parseShadowX(x)} ${parseShadowY(event.target.value)} ${parseShadowBlur(blur)} ${parseShadowSpread(spread)} `,
		}))
	}

	const updateShadowBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateThemeValue({
			...shadow,
			value: `${parseShadowX(x)} ${parseShadowY(y)} ${parseShadowBlur(event.target.value)} ${parseShadowSpread(spread)} `,
		}))
	}

	const updateShadowSpread = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateThemeValue({
			...shadow,
			value: `${parseShadowX(x)} ${parseShadowY(y)} ${parseShadowBlur(blur)} ${parseShadowSpread(event.target.value)} `,
		}))
	}

	return (
		<Flex
			alignItems="center"
			justifyContent="space-between"
			marginTop={2}
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
				onBlur={updateShadowX}
			/>
		</Flex>
	)
}

export { EditShadow }
