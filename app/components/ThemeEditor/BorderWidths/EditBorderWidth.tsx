import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text, Box, Button } from '@i/components'
import { PixelInput } from '../PixelInput'
import { updateThemeValue } from '../../../store'
import type { ThemeValue, ThemeBorderWidth } from '@i/theme'

export const BORDER_WIDTH_MIN = 1
export const BORDER_WIDTH_MAX = 100
export const BORDER_WIDTH_PRECISION = 1

// Takes a pixel value from an <Input type="number"> field
// and returns ThemeBorderWidth['value'] string
export const parseBorderWidth = (value: string) => `${parseFloat(Number(value).toFixed(BORDER_WIDTH_PRECISION))}px`

const EditBorderWidth = ({
	borderWidth,
	setDeleteValue,
}: {
    borderWidth: ThemeBorderWidth
	setDeleteValue: React.Dispatch<React.SetStateAction<ThemeValue | null>>
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
		<>
			<Box flexGrow={1}>
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
			</Box>
			<Button
				invisible
				flexShrink={0}
				alignSelf="flex-end"
				paddingBottom={3}
				onClick={() => setDeleteValue(borderWidth)}
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

export { EditBorderWidth }
