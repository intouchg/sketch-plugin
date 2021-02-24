import React from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text } from '@i/components'
import { FontFamilyMenu, TextTransformMenu } from '../EditorMenus'
import { ItemContainer } from './ItemContainer'
import { updateThemeVariant } from '../../../store'
import type { ThemeVariant } from '@i/theme'

const FontEditor = ({
	variant,
}: {
	variant: ThemeVariant
}) => {
	const dispatch = useDispatch()
	const styles = variant.styles

	const updateVariantProperty = (styleProperty: string, value: string) => {
		dispatch(updateThemeVariant({
			...variant,
			styles: {
				...styles,
				[styleProperty]: value,
			},
		}))
	}

	return (
		<>
			<ItemContainer>
				<Text>
					fontFamily
				</Text>
				<FontFamilyMenu
					id={(styles.fontFamily || '') as string}
					onChange={(value) => updateVariantProperty('fontFamily', value)}
				/>
			</ItemContainer>
			<ItemContainer>
				<Text>
					textTransform
				</Text>
				<TextTransformMenu
					value={(styles.textTransform || '') as string}
					onChange={(value) => updateVariantProperty('textTransform', value)}
				/>
			</ItemContainer>
		</>
	)
}

export { FontEditor }
