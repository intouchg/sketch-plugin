import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text } from '@i/components'
import { PixelInput } from '../PixelInput'
import { updateThemeValue } from '../../../store'
import type { ThemeRadius } from '@i/theme'

export const RADIUS_MIN = 1
export const RADIUS_MAX = 100
export const RADIUS_PRECISION = 1

// Takes a pixel value from an <Input type="number"> field
// and returns ThemeRadius['value'] string
export const parseRadius = (value: string) => `${parseFloat(Number(value).toFixed(RADIUS_PRECISION))}px`

const EditRadius = ({
	radius,
}: {
    radius: ThemeRadius
}) => {
	const dispatch = useDispatch()
	const [ value, setValue ] = useState('')

	useEffect(() => {
		if (radius) {
			setValue(radius.value.split('px')[0])
		}
	}, [ radius ])

	const updateRadius = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateThemeValue({
			...radius,
			value: parseRadius(event.target.value),
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
				radius
			</Text>
			<PixelInput
				min={RADIUS_MIN}
				max={RADIUS_MAX}
				value={value}
				onChange={(event) => setValue(event.target.value)}
				onBlur={updateRadius}
			/>
		</Flex>
	)
}

export { EditRadius }
