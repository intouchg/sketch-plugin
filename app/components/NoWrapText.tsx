import React from 'react'
import styled from 'styled-components'
import { Text } from '@intouchg/components'

const NoWrapText = styled(Text)<{ lineHeight?: string }>`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	align-self: center;
	line-height: ${(props) => props.lineHeight ? props.lineHeight : 'unset'};
`

export { NoWrapText }
