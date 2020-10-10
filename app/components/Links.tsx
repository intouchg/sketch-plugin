import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Link as StyledLink } from '@i/components'

export const PrimaryLink = styled(Link).attrs({ as: StyledLink })``
PrimaryLink.displayName = 'PrimaryLink'
