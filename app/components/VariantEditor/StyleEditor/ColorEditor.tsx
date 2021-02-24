import React from 'react'
import { useDispatch } from 'react-redux'
import { Text } from '@i/components'
import { ColorMenu } from '../EditorMenus'
import { ItemContainer } from './ItemContainer'
import { updateThemeVariant } from '../../../store'
import { styleProperties } from './index'
import type { ThemeVariant } from '@i/theme'

const ColorEditor = ({
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
