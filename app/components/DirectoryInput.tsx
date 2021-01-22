import React from 'react'
import styled from 'styled-components'
import { Flex, Box, InvisibleButton, Text } from '@i/components'
import { FolderIcon } from './Icons'

const TruncatedText = styled(Text)`
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`

const DirectoryInput = ({
	value,
	onClick,
	...props
}: {
    value: string
    onClick: () => void
} & React.ComponentProps<typeof Flex>) => (
	<InvisibleButton
		position="relative"
		width="100%"
		onClick={onClick}
	>
		<Flex
			alignItems="center"
			height="48px"
			paddingX={3}
			backgroundColor="Card"
			borderRadius="Large"
			{...props}
		>
			<TruncatedText maxWidth="90%">
				{value}
			</TruncatedText>
		</Flex>
		<Box
			position="absolute"
			top="0"
			right="0"
			margin="14px"
			marginTop="13px"
		>
			<FolderIcon
				fill="Text Light"
				width="20px"
				height="21px"
			/>
		</Box>
	</InvisibleButton>
)

export { DirectoryInput }
