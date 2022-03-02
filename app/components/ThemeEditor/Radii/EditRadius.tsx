import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text, Box, Button } from '@intouchg/components'
import { PixelInput } from '../PixelInput'
import { updateThemeValue } from '../../../store'
import type { ThemeValue, ThemeRadius } from '@intouchg/theme'

export const RADIUS_MIN = 1
export const RADIUS_MAX = 9999
export const RADIUS_PRECISION = 1

// Takes a pixel value from an <Input type="number"> field
// and returns ThemeRadius['value'] string
export const parseRadius = (value: string) => `${parseFloat(Number(value).toFixed(RADIUS_PRECISION))}px`

const EditRadius = ({
	radius,
	setDeleteValue,
}: {
    radius: ThemeRadius
	setDeleteValue: React.Dispatch<React.SetStateAction<ThemeValue | null>>
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
		<>
			<Box flexGrow={1}>
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
			</Box>
			<Button
				invisible
				flexShrink={0}
				alignSelf="flex-end"
				paddingBottom={3}
				onClick={() => setDeleteValue(radius)}
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

export { EditRadius }
