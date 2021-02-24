import React from 'react'
import { useSelector } from 'react-redux'
import { Flex, Text } from '@i/components'
import { FontSizeMenu } from '../EditorMenus'
import type { ThemeVariant } from '@i/theme'

const FontEditor = ({
	variant,
}: {
	variant: ThemeVariant
}) => {
	return (
		<>
			<Flex
				flexShrink={0}
				width="100%"
				alignItems="center"
				justifyContent="space-between"
				paddingX={3}
			>
				<Text>
					fontSize
				</Text>
				<FontSizeMenu variant={variant} />
			</Flex>
		</>
	)
}

export { FontEditor }
