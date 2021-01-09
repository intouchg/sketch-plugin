import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Box } from '@i/components'

const spinAnimation = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

const Loading = styled(Box)`
    width: 120px;
    height: 120px;
    border: 16px solid ${(props) => props.theme.colors.Background};
    border-top: 16px solid ${(props) => props.theme.colors.Primary};
    border-radius: 50%;
    animation: ${spinAnimation} 1s linear infinite;
`

export { Loading }
