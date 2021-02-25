import React from 'react'
import { Text } from '@i/components'
import { ColorMenu } from '../EditorMenus'
import { ItemContainer } from './ItemContainer'
import { styleProperties } from './index'
import type { ThemeVariant, SelectorProperty } from '@i/theme'

const ColorEditor = ({
	variant,
	selectorProperty,
	updateVariantProperty,
}: {
	variant: ThemeVariant
	selectorProperty: SelectorProperty | ''
	updateVariantProperty: (propertyName: keyof ThemeVariant['styles'], value: string) => void
}) => {
	const styles = !selectorProperty ? variant.styles : (variant.styles[selectorProperty] || {})

	return (
		<>
			{styleProperties.color.map((propertyName) => (
				<ItemContainer key={propertyName}>
					<Text>
						{propertyName}
					</Text>
					<ColorMenu
						id={(styles[propertyName] || '') as string}
						onChange={(value) => updateVariantProperty(propertyName, value)}
					/>
				</ItemContainer>
			))}
		</>
	)
}

export { ColorEditor }
