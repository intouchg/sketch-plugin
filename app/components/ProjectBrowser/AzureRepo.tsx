import React from 'react'
import styled from 'styled-components'
import { Box, Text } from '@i/components'
import { gitRepoProp } from './AzureRepos'

const TruncatedText = styled(Text)`
	display: inline-block;
	max-width: 220px;
	padding: 0.2em 0.5em;
	border-radius: 12px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	cursor: pointer;
`

const AzureRepo = ({
	id,
	name,
	selected,
	onClick,
}: {
	id: string
	name: string
	selected: boolean
	onClick: (id: string) => void
}) => {
	const handleClick = () => onClick(id)

	return (
		<Box
			width={[ 1, 1 / 2, 1 / 3, 1 / 4 ]}
			padding={3}
		>
			<TruncatedText
				{...gitRepoProp}
				backgroundColor="grey.1"
				border="4px solid"
				borderColor={selected ? 'blue' : 'grey.1'}
				onClick={handleClick}
			>
				{name}
			</TruncatedText>
		</Box>
	)
}

export { AzureRepo }
