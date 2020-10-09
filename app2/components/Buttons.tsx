import { Button } from '@i/components'

const PrimaryButton = Button
PrimaryButton.displayName = 'PrimaryButton'
PrimaryButton.defaultProps = { variant: 'Primary' }

const SecondaryButton = Button
SecondaryButton.displayName = 'SecondaryButton'
SecondaryButton.defaultProps = { variant: 'Secondary' }

const TertiaryButton = Button
TertiaryButton.displayName = 'TertiaryButton'
TertiaryButton.defaultProps = { variant: 'Tertiary' }

const WelcomeButton = Button
WelcomeButton.displayName = 'WelcomeButton'
WelcomeButton.defaultProps = { variant: 'Welcome' }

export {
	Button,
	PrimaryButton,
	SecondaryButton,
	TertiaryButton,
	WelcomeButton,
}
