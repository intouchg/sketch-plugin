import React from 'react'
import { Stack, Flex, Box, Text, Heading, Label } from '@i/components'
import { Checkbox } from '../Checkbox'
import type { ThemeFont } from '@i/theme'
import type { SystemFontFamily, SPFontTypeface } from '../../sketchApi'

// const SelectableFont = ({
// 	checked,
// 	toggleChecked,
// 	_name,
// 	style,
// }: {
// 	checked: boolean
// 	toggleChecked: () => void
// } & SPFontTypeface) => (
// 	<Box
// 		paddingRight={2}
// 		marginBottom={2}
// 	>
// 		<Label
// 			display="inline-block"
// 			padding={2}
// 			paddingRight="12px"
// 			borderRadius="Large"
// 			backgroundColor="Background"
// 		>
// 			<Flex alignItems="center">
// 				<Checkbox
// 					checked={checked}
// 					marginRight="12px"
// 					onClick={toggleChecked}
// 				/>
// 				<Text
// 					variant="secondary"
// 					fontFamily={_name}
// 				>
// 					{style}
// 				</Text>
// 			</Flex>
// 		</Label>
// 	</Box>
// )

const Typeface = ({
	_name,
	style,
}: SPFontTypeface) => (
	<Text
		variant="secondary"
		fontFamily={_name}
	>
		{style}
	</Text>
)

const FontFamily = ({
	name,
	path,
	typefaces,
	values,
}: SystemFontFamily & {
	values: (ThemeFont & { imported?: boolean, selected?: boolean })[]
}) => {
	console.log('typefaces ', typefaces)
	console.log('values ', values)

	return (
		<Stack marginBottom={5}>
			<Heading
				variant="Tertiary"
				marginBottom={3}
			>
				{name}
			</Heading>
			<Flex flexWrap="wrap">
				{typefaces.map((typeface) => (
					<Flex key={typeface._name}>
						<Typeface {...typeface} />
					</Flex>
				))}
			</Flex>
		</Stack>
	)
}

export { FontFamily }

// {typefaces.map((typeface) => (
// 	<SelectableFont
// 		key={typeface._name}
// 		checked={values.some((font) => font.imported && font.typeface === typeface._name)}
// 		toggleChecked={() => {}}
// 		{...typeface}
// 	/>
// ))}

