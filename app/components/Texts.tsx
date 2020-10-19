import React from 'react'
import styled from 'styled-components'
import { Text } from '@i/components'

export const AccentText = styled(Text).attrs({ variant: 'Accent' })``
AccentText.displayName = 'AccentText'

export const SecondaryText = styled(Text).attrs({ variant: 'Secondary' })``
SecondaryText.displayName = 'SecondaryText'

export const TruncatedText = styled(Text)`
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`
TruncatedText.displayName = 'TruncatedText'
