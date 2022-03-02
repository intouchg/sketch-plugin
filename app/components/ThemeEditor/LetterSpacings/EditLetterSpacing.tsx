import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text, Box, Button } from '@intouchg/components'
import { PixelInput } from '../PixelInput'
import { updateThemeValue } from '../../../store'
import type { ThemeValue, ThemeLetterSpacing } from '@intouchg/theme'

export const LETTER_SPACING_MIN = -50
export const LETTER_SPACING_MAX = 50
export const LETTER_SPACING_PRECISION = 1

// Takes a pixel value from an <Input type="number"> field
// and returns ThemeLetterSpacing['value'] string
export const parseLetterSpacing = (value: string) => `${parseFloat(Number(value).toFixed(LETTER_SPACING_PRECISION))}px`

const EditLetterSpacing = ({
	letterSpacing,
	setDeleteValue,
}: {
    letterSpacing: ThemeLetterSpacing
	setDeleteValue: React.Dispatch<React.SetStateAction<ThemeValue | null>>
}) => {
	const dispatch = useDispatch()
	const [ value, setValue ] = useState('')

	useEffect(() => {
		if (letterSpacing) {
			setValue(letterSpacing.value.split('px')[0])
		}
	}, [ letterSpacing ])

	const updateLetterSpacing = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateThemeValue({
			...letterSpacing,
			value: parseLetterSpacing(event.target.value),
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
						letterSpacing
					</Text>
					<PixelInput
						min={LETTER_SPACING_MIN}
						max={LETTER_SPACING_MAX}
						value={value}
						onChange={(event) => setValue(event.target.value)}
						onBlur={updateLetterSpacing}
					/>
				</Flex>
			</Box>
			<Button
				invisible
				flexShrink={0}
				alignSelf="flex-end"
				paddingBottom={3}
				onClick={() => setDeleteValue(letterSpacing)}
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

export { EditLetterSpacing }
