import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Stack, Flex, Box, Text } from '@i/components'
import { ColorEditor } from './ColorEditor'
import { ShadowEditor } from './ShadowEditor'
import { FontSizeEditor } from './FontSizeEditor'
import { PaddingEditor } from './PaddingEditor'
import { FontEditor } from './FontEditor'
import { BorderEditor } from './BorderEditor'
import { IconEditor } from './IconEditor'
import { SvgEditor } from './SvgEditor'
import type { ThemeVariant, ThemeValue } from '@i/theme'

export const styleProperties = {
	color: [
		'color', 'backgroundColor', 'borderColor',
	],
	shadow: [
		'boxShadow',
	],
	font: [
		'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing',
	],
	padding: [
		'padding', 'paddingX', 'paddingY', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
	],
	border: [
		'borderWidth', 'borderRadius',
	],
	icon: [
		'icon', 'fill', 'stroke',
	],
	svg: [
		'fill', 'fill1', 'fill2', 'fill3', 'stroke', 'stroke1', 'stroke2', 'stroke3',
	],
} as const

const stylePropertyComponentConfig: {
	[key in keyof typeof styleProperties]: React.ReactNode
} = {
	color: ColorEditor,
	shadow: ShadowEditor,
	font: FontEditor,
	padding: PaddingEditor,
	border: BorderEditor,
	icon: IconEditor,
	svg: SvgEditor,
}

// Maps variants to their editable style properties
const variantStylePropertyConfig: {
	[key in ThemeVariant['variantType']]: { [key in keyof typeof styleProperties]?: boolean }
} = {
	button: { color: true, shadow: true, font: true, padding: true, border: true },
	text: { color: true, font: true },
	heading: { color: true, font: true },
	link: { color: true, font: true },
	icon: { color: true, svg: true },
	label: { color: true, shadow: true, font: true },
	input: { color: true, shadow: true, font: true, border: true },
	radio: { color: true, shadow: true, padding: true, icon: true, border: true },
	checkbox: { color: true, shadow: true, padding: true, icon: true, border: true },
	select: { color: true, shadow: true, padding: true, icon: true, border: true },
	slider: { color: true, shadow: true, padding: true, icon: true, border: true },
	toggle: { color: true, shadow: true, padding: true, icon: true, border: true },
	textarea: { color: true, shadow: true, font: true, padding: true, border: true },
}

const StyleEditor = ({
	variant,
}: {
	variant: ThemeVariant | null
}) => {
	const values = useSelector((state) => state.theme.values)

	if (!variant) {
		return null
	}

	const { color, shadow, font, padding, border, icon, svg } = variantStylePropertyConfig[variant.variantType]

	return (
		<Stack
			paddingTop={3}
			paddingBottom={4}
		>
			{color && (
				<Stack paddingY={1}>
					<ColorEditor variant={variant} />
				</Stack>
			)}
			{font && (
				<Stack paddingY={1}>
					<FontSizeEditor variant={variant} />
				</Stack>
			)}
			{font && (
				<Stack paddingY={1}>
					<FontEditor variant={variant} />
				</Stack>
			)}
			{border && (
				<Stack paddingY={1}>
					<BorderEditor variant={variant} />
				</Stack>
			)}
		</Stack>
	)
}

export { StyleEditor }
