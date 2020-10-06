import { Button } from '@i/components'

const PrimaryButton = Button
PrimaryButton.displayName = 'PrimaryButton'
PrimaryButton.defaultProps = { variant: 'primary' }

const SecondaryButton = Button
SecondaryButton.displayName = 'SecondaryButton'
SecondaryButton.defaultProps = { variant: 'secondary' }

const TertiaryButton = Button
TertiaryButton.displayName = 'TertiaryButton'
TertiaryButton.defaultProps = { variant: 'tertiary' }

export {
	Button,
	PrimaryButton,
	SecondaryButton,
	TertiaryButton,
}
