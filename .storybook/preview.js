import { withPlayroom } from 'storybook-addon-playroom'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { withTheme } from './themeDecorator'

export const decorators = [
    withPlayroom,
    withTheme,
]

export const parameters = {
    knobs: {
        escapeHTML: false,
    },
    playroom: {
        url: process.env.NODE_ENV === 'production' ? '/playroom/' : undefined,
        reactElementToJSXStringOptions: {
            showDefaultProps: false,
        },
    },
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    },
    // backgrounds: {
    //     default: 'twitter',
    //     values: [
    //       { name: 'twitter', value: '#00aced' },
    //       { name: 'facebook', value: '#3b5998' },
    //     ],
    // },
}