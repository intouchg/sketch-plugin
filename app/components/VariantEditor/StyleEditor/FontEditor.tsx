import React from 'react'
import { Text } from '@i/components'
import { FontFamilyMenu, TextMenu, LetterSpacingMenu, LineHeightMenu } from '../EditorMenus'
import { ItemContainer } from './ItemContainer'
import type { ThemeVariant } from '@i/theme'

const FontEditor = ({
	variant,
	updateVariantProperty,
}: {
	variant: ThemeVariant
	updateVariantProperty: (propertyName: keyof ThemeVariant['styles'], value: string) => void
}) => (
	<>
		<ItemContainer>
			<Text>
				fontFamily
			</Text>
			<FontFamilyMenu
				id={(variant.styles.fontFamily || '') as string}
				onChange={(value) => updateVariantProperty('fontFamily', value)}
			/>
		</ItemContainer>
		<ItemContainer>
			<Text>
				lineHeight
			</Text>
			<LineHeightMenu
				id={(variant.styles.lineHeight || '') as string}
				onChange={(value) => updateVariantProperty('lineHeight', value)}
			/>
		</ItemContainer>
		<ItemContainer>
			<Text>
				letterSpacing
			</Text>
			<LetterSpacingMenu
				id={(variant.styles.letterSpacing || '') as string}
				onChange={(value) => updateVariantProperty('letterSpacing', value)}
			/>
		</ItemContainer>
		<ItemContainer>
			<Text>
				textTransform
			</Text>
			<TextMenu
				propertyNames={[ 'capitalize', 'uppercase', 'lowercase' ]}
				value={(variant.styles.textTransform || '') as string}
				onChange={(value) => updateVariantProperty('textTransform', value)}
			/>
		</ItemContainer>
		<ItemContainer>
			<Text>
				textDecoration
			</Text>
			<TextMenu
				propertyNames={[ 'none', 'underline', 'overline', 'line-through' ]}
				value={(variant.styles.textDecoration || '') as string}
				onChange={(value) => updateVariantProperty('textDecoration', value)}
			/>
		</ItemContainer>
	</>
)

export { FontEditor }
