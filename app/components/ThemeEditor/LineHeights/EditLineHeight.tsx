import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text, Box, Button } from '@i/components'
import { NumberInput } from '../NumberInput'
import { updateThemeValue } from '../../../store'
import type { ThemeValue, ThemeLineHeight } from '@i/theme'

export const LINE_HEIGHT_MIN = 0.025
export const LINE_HEIGHT_MAX = 10
export const LINE_HEIGHT_PRECISION = 3

// Takes a numeric value from an <Input type="number"> field
// and returns ThemeLineHeight['value'] string
export const parseLineHeight = (value: string) => `${parseFloat((Number(value)).toFixed(LINE_HEIGHT_PRECISION))}`

const EditLineHeight = ({
	lineHeight,
	setDeleteValue,
}: {
    lineHeight: ThemeLineHeight
	setDeleteValue: React.Dispatch<React.SetStateAction<ThemeValue | null>>
}) => {
	const dispatch = useDispatch()
	const [ value, setValue ] = useState('')

	useEffect(() => {
		if (lineHeight) {
			setValue(parseFloat(Number(lineHeight.value).toFixed(LINE_HEIGHT_PRECISION)).toString())
		}
	}, [ lineHeight ])

	const updateLineHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateThemeValue({
			...lineHeight,
			value: parseLineHeight(event.target.value),
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
						lineHeight
					</Text>
					<NumberInput
						min={LINE_HEIGHT_MIN}
						max={LINE_HEIGHT_MAX}
						value={value}
						onChange={(event) => setValue(event.target.value)}
						onBlur={updateLineHeight}
					/>
				</Flex>
			</Box>
			<Button
				invisible
				flexShrink={0}
				alignSelf="flex-end"
				paddingBottom={3}
				onClick={() => setDeleteValue(lineHeight)}
			>
				<Text
					color="Critical"
					fontSize={2}
					fontWeight="Medium"
				>
					Delete
				</Text>
			</Button>
		</>
	)
}

export { EditLineHeight }
