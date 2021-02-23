import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Text } from '@i/components'
import { ResponsiveValueMenu } from '../EditorMenus'
import { FontSizeMenu } from '../EditorMenus'
import { updateThemeVariant } from '../../../store'
import { createUuid } from '@i/utility'
import type { ThemeVariant, ThemeValue, ThemeBreakpoint } from '@i/theme'

const getResponsiveValues = (
	variantStyleValue: string | string[] | undefined,
	breakpoints: ThemeBreakpoint[],
	themeValues: ThemeValue[],
) => {
	const responsiveValues: any[] = []

	new Array(breakpoints.length + 1).fill(1).forEach((_, index) => {
		if (index === 0 && typeof variantStyleValue === 'string' && variantStyleValue !== '') {
			responsiveValues.push(themeValues.find((v) => v.id === variantStyleValue)!)
		}
		else if (typeof variantStyleValue === 'object') {
			responsiveValues.push(themeValues.find((v) => v.id === variantStyleValue[index])!)
		}
		else {
			responsiveValues.push({
				id: createUuid(),
				value: responsiveValues[index - 1].value,
				inherited: true,
			})
		}
	})

	return responsiveValues
}

const FontEditor = ({
	variant,
}: {
	variant: ThemeVariant
}) => {
	const dispatch = useDispatch()
	const values = useSelector((state) => state.theme.values)
	const styles = variant.styles

	const fontSizeValues = getResponsiveValues(styles.fontSize, values.breakpoints, values.fontSizes)

	console.log(fontSizeValues)

	const updateVariantFont = (styleProperty: string, id: string | null) => {
		dispatch(updateThemeVariant({
			...variant,
			styles: {
				...styles,
				[styleProperty]: id || '',
			},
		}))
	}

	return (
		<>
			<Flex
				width="100%"
				alignItems="center"
				justifyContent="space-between"
				paddingX={3}
			>
				<Text>
					fontSize
				</Text>
				<FontSizeMenu
					values={fontSizeValues}
					onChange={}
				/>
			</Flex>
		</>
	)
}

export { FontEditor }
