import React from 'react'
import styled from 'styled-components'
import { Flex } from '@i/components'
import { CheckmarkIcon, OverwriteIcon } from '../Icons'

const ImportIcon = ({
	imported,
	selected,
	alreadySaved,
	willOverwrite,
}: {
	imported: boolean | undefined
	selected: boolean | undefined
	alreadySaved: boolean
	willOverwrite?: boolean
}) => {
	if (alreadySaved) {
		return null
	}

	return (
		<Flex
			width="28px"
			height="28px"
			alignItems="center"
			justifyContent="center"
			backgroundColor={willOverwrite ? 'yellow' : 'Primary'}
			borderWidth="2px"
			borderStyle="solid"
			borderColor="Card"
			borderRadius="50%"
		>
			{imported && !willOverwrite && (
				<CheckmarkIcon
					fill="Card"
					width="16px"
				/>
			)}
			{imported && willOverwrite && (
				<OverwriteIcon
					fill="Card"
					width="16px"
				/>
			)}
		</Flex>
	)
}

export { ImportIcon }
