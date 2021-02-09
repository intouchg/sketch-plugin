import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Input, Flex, Text, Label } from '@i/components'
import { PixelInput } from '../PixelInput'
import { updateThemeValue } from '../../../store'
import type { ThemeFontSize } from '@i/theme'

const EditFontSize = ({
	fontSize,
}: {
    fontSize: ThemeFontSize
}) => {
	const dispatch = useDispatch()
	const [ value, setValue ] = useState('')

	useEffect(() => {
		if (fontSize) {
			setValue(parseFloat((Number(fontSize.value.split('rem')[0]) * 16).toFixed(4)).toString())
		}
	}, [ fontSize ])

	const updateFontSize = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateThemeValue({
			...fontSize,
			value: parseFloat((Number(value) / 16).toFixed(4)).toString() + 'rem',
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
				fontSize
			</Text>
			<PixelInput
				value={value}
				onChange={(event) => setValue(event.target.value)}
				onBlur={updateFontSize}
			/>
		</Flex>
	)
}

export { EditFontSize }
