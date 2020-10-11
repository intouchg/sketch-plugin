import styled from 'styled-components'
import { Button } from '@i/components'

export const PrimaryButton = styled(Button).attrs({ variant: 'Primary' })``
PrimaryButton.displayName = 'PrimaryButton'

export const SecondaryButton = styled(Button).attrs({ variant: 'Secondary' })``
SecondaryButton.displayName = 'SecondaryButton'

export const TertiaryButton = styled(Button).attrs({ variant: 'Tertiary' })``
TertiaryButton.displayName = 'TertiaryButton'

export const WelcomeButton = styled(Button).attrs({ variant: 'Welcome' })``
WelcomeButton.displayName = 'WelcomeButton'

export const InvisibleButton = styled(Button).attrs({ variant: 'Invisible' })``
InvisibleButton.displayName = 'InvisibleButton'
