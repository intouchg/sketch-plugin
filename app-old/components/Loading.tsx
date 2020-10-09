import styled, { keyframes } from 'styled-components'
import { Box } from '@i/components'

const spinningAnimation = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

const Loading = styled(Box)`
    width: 120px;
    height: 120px;
    border-width: 16px;
    border-style: solid;
    border-radius: 50%;
    animation: ${spinningAnimation} 1.3s linear infinite;
`

export { Loading }
