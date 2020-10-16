import React from 'react'
import { Stack, Flex, Box, Text, Heading, Label } from '@i/components'
import { Checkbox } from '../Checkbox'
import type { SystemFontsDictionary, SPFontTypeface } from '../../sketchApi'

const SelectableFont = ({
	checked,
	toggleChecked,
	_name,
	style,
}: {
	checked: boolean
	toggleChecked: () => void
} & SPFontTypeface) => (
	<Box
		paddingRight={2}
		marginBottom={2}
	>
		<Label
			display="inline-block"
			padding={2}
			paddingRight="12px"
			borderRadius="Large"
			backgroundColor="Background"
		>
			<Flex alignItems="center">
				<Checkbox
					checked={checked}
					marginRight="12px"
					onClick={toggleChecked}
				/>
				<Text
					variant="secondary"
					fontFamily={_name}
				>
					{style}
				</Text>
			</Flex>
		</Label>
	</Box>
)

const FontFamily = ({
	name,
	path,
	typefaces,
}: SystemFontsDictionary[string]) => {
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
					<SelectableFont
						checked
						key={typeface._name}
						toggleChecked={() => {}}
						{...typeface}
					/>
				))}
			</Flex>
		</Stack>
	)
}

export { FontFamily }
