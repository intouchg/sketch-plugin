import React from 'react'
import styled from 'styled-components'
import { Flex, Box, InvisibleButton, Text } from '@i/components'
import { FolderIcon } from './Icons'
import { useDisplayErrorBanner } from '../hooks'
import { sendSketchCommand } from '../sketchApi'

const TruncatedText = styled(Text)`
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`

const DirectoryInput = ({
	value,
	error,
	onChange,
	...props
}: {
	value: string
	error?: boolean
    onChange: (filepath: string) => void
} & React.ComponentProps<typeof Flex>) => {
	const displayErrorBanner = useDisplayErrorBanner()

	const selectDirectory = () => sendSketchCommand('selectDirectory', {})
		.then((filepath) => onChange(filepath))
		.catch((error) => displayErrorBanner(error))

	return (
		<InvisibleButton
			position="relative"
			width="100%"
			onClick={selectDirectory}
		>
			<Flex
				alignItems="center"
				height="48px"
				paddingX={3}
				backgroundColor="Card"
				borderWidth="1px"
				borderStyle="solid"
				borderColor={error ? 'Critical' : 'transparent'}
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
}

export { DirectoryInput }
