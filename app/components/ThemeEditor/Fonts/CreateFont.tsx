import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Heading, Button, Text, Stack, Input } from '@i/components'
import { createThemeValue } from '../../../store'

const CreateFont = ({
	setCreating,
}: {
	setCreating: (creating: boolean) => void
}) => {
	const dispatch = useDispatch()
	const values = useSelector((state) => state.theme.values.fonts)
	const systemFonts = useSelector((state) => state.theme.systemFonts)
	const [ value, setValue ] = useState('')
	const [ filterText, setFilterText ] = useState('')

	const addFont = () => {
		const { _name, family } = systemFonts[value].typefaces[0]

		if (values.some((font) => font.family === family)) {
			return setCreating(false)
		}

		dispatch(createThemeValue({
			type: 'font',
			name: _name,
			typeface: _name,
			family,
			value: _name,
		}))

		setCreating(false)
	}

	let filteredSystemFonts = systemFonts

	if (filterText !== '') {
		const lowercaseFilterText = filterText.toLowerCase()
		filteredSystemFonts = {}

		Object.entries(systemFonts).forEach(([ fontFamily, fontData ]) => {
			if (fontFamily.toLowerCase().includes(lowercaseFilterText)) {
				filteredSystemFonts[fontFamily] = fontData
			}
		})
	}

	return (
		<>
			<Stack
				marginX="-16px"
				flexShrink={0}
				paddingX={3}
				boxShadow="Downward Accent"
			>
				<Input
					width="100%"
					padding={0}
					paddingBottom={3}
					style={{ transform: 'scale3d(1, 1, 1)' }}
					autoCorrect="off"
					autoCapitalize="off"
					autoComplete="off"
					spellCheck="false"
					placeholder="Search..."
					value={filterText}
					onChange={(event) => setFilterText(event.target.value)}
				/>
			</Stack>
			<Stack overflowY="scroll">
				<Stack
					flexShrink={0}
					flexGrow={1}
					paddingY={3}
					marginBottom="90px"
				>
					{Object.entries(filteredSystemFonts).map(([ fontFamily ]) => (
						<Button
							invisible
							key={fontFamily}
							display="flex"
							paddingX={2}
							paddingY={3}
							borderWidth="1px"
							borderStyle="solid"
							borderColor={value === fontFamily ? 'Primary Light' : 'transparent'}
							borderRadius={2}
							textAlign="left"
							onClick={() => setValue(fontFamily)}
						>
							<Text
								fontSize="1.2rem"
								color={value === fontFamily ? 'Primary' : 'Text'}
								style={{ fontFamily }}
							>
								{fontFamily}
							</Text>
						</Button>
					))}
				</Stack>
			</Stack>
			<Stack
				position="absolute"
				bottom="0"
				left="0"
				right="0"
				flexShrink={0}
				padding={3}
				paddingBottom={4}
				backgroundColor="Card"
				boxShadow="Upward Accent"
			>
				<Button onClick={addFont}>
					Add Font
				</Button>
			</Stack>
		</>
	)
}

export { CreateFont }
