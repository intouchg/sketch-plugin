import React from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text, Box, Button } from '@i/components'
import { BorderWidthMenu, BorderRadiusMenu } from '../EditorMenus'
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
			<Flex
				flexShrink={0}
				width="100%"
				alignItems="center"
				justifyContent="space-between"
				paddingX={3}
				marginY={1}
			>
				<Text>
					borderWidth
				</Text>
				<BorderWidthMenu
					id={(styles.borderWidth || '') as string}
					onChange={(value: string) => updateVariantProperty('borderWidth', value)}
				/>
			</Flex>
			<Flex
				flexShrink={0}
				width="100%"
				alignItems="center"
				justifyContent="space-between"
				paddingX={3}
				marginY={1}
			>
				<Text>
					borderRadius
				</Text>
				<BorderRadiusMenu
					id={(styles.borderRadius || '') as string}
					onChange={(value: string) => updateVariantProperty('borderRadius', value)}
				/>
			</Flex>
		</>
	)
}

export { BorderEditor }
