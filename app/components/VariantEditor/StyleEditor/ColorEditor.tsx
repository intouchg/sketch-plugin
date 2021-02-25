import React from 'react'
import { Text } from '@i/components'
import { ColorMenu } from '../EditorMenus'
import { ItemContainer } from './ItemContainer'
import { styleProperties } from './index'
import type { ThemeVariant } from '@i/theme'

const ColorEditor = ({
	variant,
	updateVariantProperty,
}: {
	variant: ThemeVariant
	updateVariantProperty: (propertyName: keyof ThemeVariant['styles'], value: string) => void
}) => (
	<>
		{styleProperties.color.map((propertyName) => (
			<ItemContainer key={propertyName}>
				<Text>
					{propertyName}
				</Text>
				<ColorMenu
					id={(variant.styles[propertyName] || '') as string}
					onChange={(value) => updateVariantProperty(propertyName, value)}
				/>
			</ItemContainer>
		))}
	</>
)

export { ColorEditor }
