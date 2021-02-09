import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text } from '@i/components'
import { PixelInput } from '../PixelInput'
import { updateThemeValue } from '../../../store'
import type { ThemeLineHeight } from '@i/theme'

const EditLineHeight = ({
	lineHeight,
}: {
    lineHeight: ThemeLineHeight
}) => {
	const dispatch = useDispatch()
	const [ value, setValue ] = useState('')

	useEffect(() => {
		if (lineHeight) {
			setValue(parseFloat((Number(lineHeight.value.split('rem')[0]) * 16).toFixed(4)).toString())
		}
	}, [ lineHeight ])

	const updateLineHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateThemeValue({
			...lineHeight,
			value: `${parseFloat((Number(value) / 16).toFixed(4))}rem`,
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
				lineHeight
			</Text>
			<PixelInput
				min={0}
				max={200}
				value={value}
				onChange={(event) => setValue(event.target.value)}
				onBlur={updateLineHeight}
			/>
		</Flex>
	)
}

export { EditLineHeight }
