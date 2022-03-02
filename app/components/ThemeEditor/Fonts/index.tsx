import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Stack, Flex, Box, Heading } from '@intouchg/components'
import { Font } from '../../ThemeValues'
import { Loading } from '../../Loading'
import { ImportIcon } from '../../ImportModal/ImportIcon'
import { ValuesContainer } from '../ValuesContainer'
import { RightToolbar } from '../RightToolbar'
import { CreateOverlay } from '../CreateOverlay'
import { CreateFont } from './CreateFont'
import { createThemeValue, deleteThemeValue } from '../../../store'
import { sortSystemFonts } from '../../ImportModal/Fonts'
import type { ThemeFont, ThemeValue } from '@intouchg/theme'
import type { SystemFontFamily, SPFontTypeface } from '../../../sketchApi'

const FontFamily = ({
	name,
	path,
	typefaces,
	values,
	setDeleteValue,
}: SystemFontFamily & {
	values: ThemeFont[]
	setDeleteValue: React.Dispatch<React.SetStateAction<ThemeValue | null>>
}) => {
	const dispatch = useDispatch()

	const toggleTypeface = ({ _name, family }: SPFontTypeface, matchingValue?: ThemeFont) => {
		if (matchingValue) {
			setDeleteValue(matchingValue)
		}
		else {
			dispatch(createThemeValue({
				type: 'font',
				name: _name,
				typeface: _name,
				family,
				value: _name,
			}))
		}
	}

	return (
		<Stack marginBottom={6}>
			<Heading
				variant="Tertiary"
				paddingTop={1}
				marginRight={2}
				marginBottom={3}
			>
				{name}
			</Heading>
			<Flex flexWrap="wrap">
				{typefaces.map((typeface) => {
					const name = typeface._name
					const matchingValue = values.find((font) => font.typeface === name)

					return (
						<Flex
							key={name}
							paddingRight={2}
							marginBottom={2}
						>
							<Button
								invisible
								display="flex"
								alignItems="center"
								padding={2}
								paddingRight="12px"
								borderRadius={3}
								backgroundColor={matchingValue ? 'Primary Lighter' : 'Background'}
								onClick={() => toggleTypeface(typeface, matchingValue)}
							>
								<Box marginRight={2}>
									<ImportIcon
										imported
										selected={Boolean(matchingValue)}
									/>
								</Box>
								<Font {...typeface} />
							</Button>
						</Flex>
					)
				})}
			</Flex>
		</Stack>
	)
}

const Fonts = ({
	setDeleteValue,
}: {
	setDeleteValue: React.Dispatch<React.SetStateAction<ThemeValue | null>>
}) => {
	const values = useSelector((state) => state.theme.values.fonts)
	const systemFonts = useSelector((state) => state.theme.systemFonts)
	const [ creating, setCreating ] = useState(false)

	const themeSystemFonts: SystemFontFamily[] = []

	values.forEach(({ family }) => {
		const systemFont = systemFonts[family]

		if (systemFont && !themeSystemFonts.includes(systemFont)) {
			themeSystemFonts.push(systemFont)
		}
	})

	const sortedThemeSystemFonts = themeSystemFonts.slice().sort(sortSystemFonts)

	const toggleCreating = () => setCreating((s) => !s)

	return (
		<>
			<ValuesContainer>
				<Stack
					flexGrow={1}
					minWidth="560px"
					maxWidth="860px"
					margin="auto"
					gridGap={3}
					padding={6}
				>
					{!Object.keys(systemFonts).length && (
						<Flex
							flexGrow={1}
							alignItems="center"
							justifyContent="center"
						>
							<Loading />
						</Flex>
					)}
					{sortedThemeSystemFonts.map((systemFont) => {
						const { name } = systemFont

						return (
							<FontFamily
								key={name}
								values={values.filter((font) => font.family === name)}
								setDeleteValue={setDeleteValue}
								{...systemFont}
							/>
						)
					})}
				</Stack>
				<CreateOverlay
					active={creating}
					onClick={toggleCreating}
				/>
			</ValuesContainer>
			<RightToolbar>
				{creating && (
					<CreateFont setCreating={setCreating} />
                )}
			</RightToolbar>
		</>
	)
}

export { Fonts }
