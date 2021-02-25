import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Stack, Heading } from '@i/components'
import { ColorEditor } from './ColorEditor'
import { ShadowEditor } from './ShadowEditor'
import { FontSizeEditor } from './FontSizeEditor'
import { PaddingEditor } from './PaddingEditor'
import { FontEditor } from './FontEditor'
import { BorderEditor } from './BorderEditor'
import { IconEditor } from './IconEditor'
import { SvgEditor } from './SvgEditor'
import { StateSelector } from './StateSelector'
import { updateThemeVariant } from '../../../store'
import type { ThemeVariant, StyleProperty, SelectorProperty } from '@i/theme'

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

// Maps variants to their editable style properties
const variantStylePropertyConfig: {
	[key in ThemeVariant['variantType']]: { [key in keyof typeof styleProperties]?: boolean } & { selectors?: SelectorProperty[] }
} = {
	button: { color: true, shadow: true, font: true, padding: true, border: true, selectors: [ '&:hover', '&:active' ] },
	text: { color: true, font: true },
	heading: { color: true, font: true },
	link: { color: true, font: true, selectors: [ '&:hover', '&:active', '&:visited' ] },
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
	const dispatch = useDispatch()
	const [ selectorProperty, setSelectorProperty ] = useState<SelectorProperty | ''>('')

	if (!variant) {
		return null
	}

	const { color, shadow, font, padding, border, icon, svg, selectors } = variantStylePropertyConfig[variant.variantType]

	const updateVariantProperty = (propertyName: StyleProperty, value: string) => {
		const newVariant = { ...variant, styles: { ...variant.styles } }

		if (Array.isArray(value) && value.every((v) => v === '')) {
			value = ''
		}

		if (selectorProperty) {
			if (typeof newVariant.styles[selectorProperty] === 'object') {
				newVariant.styles[selectorProperty] = {
					...newVariant.styles[selectorProperty],
					[propertyName]: value,
				}
			}
			else {
				newVariant.styles[selectorProperty] = { [propertyName]: value }
			}
		}
		else {
			newVariant.styles[propertyName] = value
		}

		dispatch(updateThemeVariant(newVariant))
	}

	return (
		<Stack
			paddingTop={3}
			paddingBottom={4}
		>
			<Heading
				flexShrink={0}
				paddingX={3}
				paddingBottom={2}
			>
				Styles
			</Heading>
			{selectors && (
				<StateSelector
					selectors={selectors}
					selectorProperty={selectorProperty}
					setSelectorProperty={setSelectorProperty}
				/>
			)}
			{color && (
				<ColorEditor
					variant={variant}
					selectorProperty={selectorProperty}
					updateVariantProperty={updateVariantProperty}
				/>
			)}
			{!selectorProperty && font && (
				<FontSizeEditor variant={variant} />
			)}
			{!selectorProperty && font && (
				<FontEditor
					variant={variant}
					updateVariantProperty={updateVariantProperty}
				/>
			)}
			{!selectorProperty && border && (
				<BorderEditor
					variant={variant}
					updateVariantProperty={updateVariantProperty}
				/>
			)}
		</Stack>
	)
}

export { StyleEditor }
