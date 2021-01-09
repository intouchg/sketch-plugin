import React from 'react'
import styled from 'styled-components'
import { Flex } from '@i/components'

const ModalBackground = styled(Flex)`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: ${(props) => props.theme.zIndices[3]};
`

export { ModalBackground }
