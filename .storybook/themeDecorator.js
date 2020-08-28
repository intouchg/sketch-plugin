import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from './temp-theme.json'

const withTheme = (storyFn) => {
    return (
        <ThemeProvider theme={theme}>
            {storyFn()}
        </ThemeProvider>
    )
}

export { withTheme }