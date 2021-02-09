import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text } from '@i/components'
import { PixelInput } from '../PixelInput'
import { updateThemeValue } from '../../../store'
import type { ThemeLetterSpacing } from '@i/theme'

// Takes a pixel value from an <Input type="number"> field
// and returns ThemeLetterSpacing['value'] string
export const parseLetterSpacing = (value: string) => `${parseFloat(Number(value).toFixed(1))}px`

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
			value: parseLetterSpacing(value),
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
				min={0}
				max={200}
				value={value}
				onChange={(event) => setValue(event.target.value)}
				onBlur={updateLetterSpacing}
			/>
		</Flex>
	)
}

export { EditLetterSpacing }
