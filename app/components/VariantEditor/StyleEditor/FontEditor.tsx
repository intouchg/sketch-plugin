import React from 'react'
import { useDispatch } from 'react-redux'
import { Text } from '@i/components'
import { FontFamilyMenu, TextMenu, LetterSpacingMenu, LineHeightMenu } from '../EditorMenus'
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
					lineHeight
				</Text>
				<LineHeightMenu
					id={(styles.lineHeight || '') as string}
					onChange={(value) => updateVariantProperty('lineHeight', value)}
				/>
			</ItemContainer>
			<ItemContainer>
				<Text>
					letterSpacing
				</Text>
				<LetterSpacingMenu
					id={(styles.letterSpacing || '') as string}
					onChange={(value) => updateVariantProperty('letterSpacing', value)}
				/>
			</ItemContainer>
			<ItemContainer>
				<Text>
					textTransform
				</Text>
				<TextMenu
					propertyNames={[ 'capitalize', 'uppercase', 'lowercase' ]}
					value={(styles.textTransform || '') as string}
					onChange={(value) => updateVariantProperty('textTransform', value)}
				/>
			</ItemContainer>
			<ItemContainer>
				<Text>
					textDecoration
				</Text>
				<TextMenu
					propertyNames={[ 'underline', 'overline', 'line-through' ]}
					value={(styles.textDecoration || '') as string}
					onChange={(value) => updateVariantProperty('textDecoration', value)}
				/>
			</ItemContainer>
		</>
	)
}

export { FontEditor }
