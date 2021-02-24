import React from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text } from '@i/components'
import { ColorMenu } from '../EditorMenus'
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

	const updateVariantColor = (styleProperty: string, id: string | null) => {
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
			{styleProperties.color.map((propertyName) => (
				<Flex
					key={propertyName}
					flexShrink={0}
					width="100%"
					alignItems="center"
					justifyContent="space-between"
					paddingX={3}
				>
					<Text>
						{propertyName}
					</Text>
					<ColorMenu
						id={styles[propertyName] as string || null}
						onChange={(id) => updateVariantColor(propertyName, id)}
					/>
				</Flex>
			))}
		</>
	)
}

export { ColorEditor }
