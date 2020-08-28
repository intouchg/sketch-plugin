import React from 'react'
import { ThemeProvider } from 'styled-components'
import tempTheme from '../.storybook/temp-theme.json'

// To use multiple themes at runtime, configure
// the "themes" prop in playroom.config.js and
// pass the "theme" prop to ThemeProvider

export default ({ theme, children }) => (
    <ThemeProvider theme={tempTheme}>
        {children}
    </ThemeProvider>
)