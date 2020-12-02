import React from 'react'
import styled from 'styled-components'
import { Text } from '@i/components'

const NoWrapText = styled(Text)`
	white-space: nowrap;
	line-height: unset;
	overflow: hidden;
	text-overflow: ellipsis;
	align-self: center;
`

export { NoWrapText }
