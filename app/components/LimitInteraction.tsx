import React from 'react'
import styled from 'styled-components'
import { Box } from '@i/components'

const LimitInteraction = styled(Box)<{ unlimit: boolean }>`
	${(props) => props.unlimit ? `
        pointer-events: unset;
    ` : `
		pointer-events: none;
		opacity: 0.5;
	`}
`

export { LimitInteraction }