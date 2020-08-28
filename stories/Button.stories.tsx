import React from 'react'
import { Button } from '@i/components'
import { text as textKnob, boolean as booleanKnob } from '@storybook/addon-knobs'

export default { title: 'Button' }

export const text = () => (
    <Button disabled={booleanKnob('Disabled', false)}>
        {textKnob('Button Text', 'Click Me!')}
    </Button>
)

export const emoji = () => (
    <Button>
        😀 😎 👍 💯
    </Button>
)

export const accessible = () => (
    <Button>
        Accessible button
    </Button>
)

export const inaccessible = () => (
    <Button style={{ backgroundColor: 'red', color: 'darkRed' }}>
        Inaccessible button
    </Button>
)
