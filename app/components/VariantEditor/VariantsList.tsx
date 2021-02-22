import React from 'react'
import { Stack, Flex, Heading, Button, Text } from '@i/components'
import { Icon } from '../Icon'
import type { ThemeVariant } from '@i/theme'

const VariantsList = ({
	variants,
	selectedId,
	setSelectedId,
}: {
	variants: ThemeVariant[]
	selectedId: string | null
	setSelectedId: React.Dispatch<React.SetStateAction<string | null>>
}) => {
	return (
		<Stack>
			<Flex
				justifyContent="space-between"
				padding={3}
				paddingBottom={2}
			>
				<Heading>
					Variants
				</Heading>
				<Button invisible>
					<Icon
						icon="Plus"
						fill="Text Light"
						width="16px"
					/>
				</Button>
			</Flex>
			{variants.map(({ id, name }) => (
				<Button
					invisible
					key={id}
					paddingX={3}
					paddingY={1}
					backgroundColor={id === selectedId ? 'Primary Lighter' : 'transparent'}
					textAlign="left"
					onClick={() => setSelectedId(id)}
				>
					<Text color={id === selectedId ? 'Primary' : 'Text'}>
						{name}
					</Text>
				</Button>
            ))}
		</Stack>
	)
}

export { VariantsList }
