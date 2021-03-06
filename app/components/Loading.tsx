import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Box, color } from '@intouchg/components'

const spinAnimation = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

type LoadingProps = {
    width?: string
    height?: string
    borderWidth?: string
}

const Loading = styled(Box)<LoadingProps>`
    width: ${(props) => props.width || '120px'};
    height: ${(props) => props.height || '120px'};
    border: ${(props) => props.borderWidth || '16px'} solid ${color('Background')};
    border-top: ${(props) => props.borderWidth || '16px'} solid ${color('Primary')};
    border-radius: 50%;
    animation: ${spinAnimation} 1s linear infinite;
`

export { Loading }
