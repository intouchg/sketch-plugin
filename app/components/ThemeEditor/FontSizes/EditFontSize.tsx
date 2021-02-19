import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text, Box, Button } from '@i/components'
import { PixelInput } from '../PixelInput'
import { updateThemeValue } from '../../../store'
import type { ThemeFontSize } from '@i/theme'

export const FONT_SIZE_MIN = 6
export const FONT_SIZE_MAX = 200
export const FONT_SIZE_PRECISION = 4

// Takes a pixel value from an <Input type="number"> field
// and returns ThemeFontSize['value'] string
export const parseFontSize = (value: string) => `${parseFloat((Number(value) / 16).toFixed(FONT_SIZE_PRECISION))}rem`

const EditFontSize = ({
	fontSize,
}: {
    fontSize: ThemeFontSize
}) => {
	const dispatch = useDispatch()
	const [ value, setValue ] = useState('')

	useEffect(() => {
		if (fontSize) {
			setValue(parseFloat((Number(fontSize.value.split('rem')[0]) * 16).toFixed(FONT_SIZE_PRECISION)).toString())
		}
	}, [ fontSize ])

	const updateFontSize = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateThemeValue({
			...fontSize,
			value: parseFontSize(event.target.value),
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
						fontSize
					</Text>
					<PixelInput
						min={FONT_SIZE_MIN}
						max={FONT_SIZE_MAX}
						value={value}
						onChange={(event) => setValue(event.target.value)}
						onBlur={updateFontSize}
					/>
				</Flex>
			</Box>
			<Button
				invisible
				alignSelf="flex-end"
				onClick={() => {}}
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

export { EditFontSize }
