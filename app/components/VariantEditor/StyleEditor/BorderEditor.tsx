import React from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text, Box, Button } from '@i/components'
import { BorderWidthMenu } from '../EditorMenus'
import { updateThemeVariant } from '../../../store'
import type { ThemeVariant } from '@i/theme'

const BorderEditor = ({
	variant,
}: {
    variant: ThemeVariant
}) => {
	const dispatch = useDispatch()
	const styles = variant.styles

	const updateVariantBorderWidth = (value: string) => {
		dispatch(updateThemeVariant({
			...variant,
			styles: {
				...styles,
				borderWidth: value,
			},
		}))
	}

	return (
		<Flex
			flexShrink={0}
			width="100%"
			alignItems="center"
			justifyContent="space-between"
			paddingX={3}
		>
			<Text>
				borderWidth
			</Text>
			<BorderWidthMenu
				id={styles.borderWidth as string}
				onChange={updateVariantBorderWidth}
			/>
		</Flex>
	)
}

export { BorderEditor }
