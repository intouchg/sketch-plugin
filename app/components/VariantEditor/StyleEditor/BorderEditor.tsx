import React from 'react'
import { useDispatch } from 'react-redux'
import { Text } from '@i/components'
import { BorderWidthMenu, BorderRadiusMenu } from '../EditorMenus'
import { ItemContainer } from './ItemContainer'
import { updateThemeVariant } from '../../../store'
import type { ThemeVariant } from '@i/theme'

const BorderEditor = ({
	variant,
}: {
    variant: ThemeVariant
}) => {
	const dispatch = useDispatch()
	const styles = variant.styles

	const updateVariantProperty = (propertyName: keyof ThemeVariant['styles'], value: string) => {
		dispatch(updateThemeVariant({
			...variant,
			styles: {
				...styles,
				[propertyName]: value,
			},
		}))
	}

	return (
		<>
			<ItemContainer>
				<Text>
					borderWidth
				</Text>
				<BorderWidthMenu
					id={(styles.borderWidth || '') as string}
					onChange={(value: string) => updateVariantProperty('borderWidth', value)}
				/>
			</ItemContainer>
			<ItemContainer>
				<Text>
					borderRadius
				</Text>
				<BorderRadiusMenu
					id={(styles.borderRadius || '') as string}
					onChange={(value: string) => updateVariantProperty('borderRadius', value)}
				/>
			</ItemContainer>
		</>
	)
}

export { BorderEditor }
