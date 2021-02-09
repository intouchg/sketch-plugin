import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text } from '@i/components'
import { PixelInput } from '../PixelInput'
import { updateThemeValue } from '../../../store'
import type { ThemeBorderWidth } from '@i/theme'

export const BORDER_WIDTH_MIN = 1
export const BORDER_WIDTH_MAX = 100

// Takes a pixel value from an <Input type="number"> field
// and returns ThemeBorderWidth['value'] string
export const parseBorderWidth = (value: string) => `${parseFloat(Number(value).toFixed(1))}px`

const EditBorderWidth = ({
	borderWidth,
}: {
    borderWidth: ThemeBorderWidth
}) => {
	const dispatch = useDispatch()
	const [ value, setValue ] = useState('')

	useEffect(() => {
		if (borderWidth) {
			setValue(borderWidth.value.split('px')[0])
		}
	}, [ borderWidth ])

	const updateBorderWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateThemeValue({
			...borderWidth,
			value: parseBorderWidth(event.target.value),
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
				borderWidth
			</Text>
			<PixelInput
				min={BORDER_WIDTH_MIN}
				max={BORDER_WIDTH_MAX}
				value={value}
				onChange={(event) => setValue(event.target.value)}
				onBlur={updateBorderWidth}
			/>
		</Flex>
	)
}

export { EditBorderWidth }
