import React from 'react'
import { Text } from '@intouchg/components'
import { BorderWidthMenu, BorderRadiusMenu } from '../EditorMenus'
import { ItemContainer } from './ItemContainer'
import type { ThemeVariant } from '@intouchg/theme'

const BorderEditor = ({
	variant,
	updateVariantProperty,
}: {
    variant: ThemeVariant
	updateVariantProperty: (propertyName: keyof ThemeVariant['styles'], value: string) => void
}) => (
	<>
		<ItemContainer>
			<Text>
				borderWidth
			</Text>
			<BorderWidthMenu
				id={(variant.styles.borderWidth || '') as string}
				onChange={(value: string) => updateVariantProperty('borderWidth', value)}
			/>
		</ItemContainer>
		<ItemContainer>
			<Text>
				borderRadius
			</Text>
			<BorderRadiusMenu
				id={(variant.styles.borderRadius || '') as string}
				onChange={(value: string) => updateVariantProperty('borderRadius', value)}
			/>
		</ItemContainer>
	</>
)

export { BorderEditor }
