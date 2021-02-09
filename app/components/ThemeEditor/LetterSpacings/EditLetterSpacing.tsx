import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text } from '@i/components'
import { PixelInput } from '../PixelInput'
import { updateThemeValue } from '../../../store'
import type { ThemeLetterSpacing } from '@i/theme'

export const LETTER_SPACING_MIN = -50
export const LETTER_SPACING_MAX = 50
export const LETTER_SPACING_PRECISION = 1

// Takes a pixel value from an <Input type="number"> field
// and returns ThemeLetterSpacing['value'] string
export const parseLetterSpacing = (value: string) => `${parseFloat(Number(value).toFixed(LETTER_SPACING_PRECISION))}px`

const EditLetterSpacing = ({
	letterSpacing,
}: {
    letterSpacing: ThemeLetterSpacing
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
	)
}

export { EditLetterSpacing }
