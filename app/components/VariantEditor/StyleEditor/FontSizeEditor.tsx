import React from 'react'
import { useSelector } from 'react-redux'
import { Flex, Text } from '@i/components'
import { FontSizeMenu } from '../EditorMenus'
import { ItemContainer } from './ItemContainer'
import type { ThemeVariant } from '@i/theme'

const FontSizeEditor = ({
	variant,
}: {
	variant: ThemeVariant
}) => {
	return (
		<ItemContainer>
			<Text>
				fontSize
			</Text>
			<FontSizeMenu variant={variant} />
		</ItemContainer>
	)
}

export { FontSizeEditor }
