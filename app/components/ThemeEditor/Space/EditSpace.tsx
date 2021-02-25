import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text, Box, Button } from '@i/components'
import { PixelInput } from '../PixelInput'
import { updateThemeValue } from '../../../store'
import type { ThemeValue, ThemeSpace } from '@i/theme'

export const SPACE_MIN = 1
export const SPACE_MAX = 100
export const SPACE_PRECISION = 1

// Takes a pixel value from an <Input type="number"> field
// and returns ThemeSpace['value'] string
export const parseSpace = (value: string) => `${parseFloat(Number(value).toFixed(SPACE_PRECISION))}px`

const EditSpace = ({
	space,
	setDeleteValue,
}: {
    space: ThemeSpace
	setDeleteValue: React.Dispatch<React.SetStateAction<ThemeValue | null>>
}) => {
	const dispatch = useDispatch()
	const [ value, setValue ] = useState('')

	useEffect(() => {
		if (space) {
			setValue(space.value.split('px')[0])
		}
	}, [ space ])

	const updateSpace = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateThemeValue({
			...space,
			value: parseSpace(event.target.value),
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
						space
					</Text>
					<PixelInput
						min={SPACE_MIN}
						max={SPACE_MAX}
						value={value}
						onChange={(event) => setValue(event.target.value)}
						onBlur={updateSpace}
					/>
				</Flex>
			</Box>
			<Button
				invisible
				flexShrink={0}
				alignSelf="flex-end"
				paddingBottom={3}
				onClick={() => setDeleteValue(space)}
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

export { EditSpace }
