import { createGlobalStyle } from 'styled-components'
import { font } from '@i/components'

const GlobalStyles = createGlobalStyle`
    html {
        height: 100%;
        box-sizing: border-box;
        background: #f8f8f8;
    }

    body {
        height: 100%;
        font-family: ${font('Avenir Next')};
    }

    *, *:before, *:after {
        box-sizing: inherit;
        margin: 0;
        padding: 0;
        position: relative;

        /* Prevent the content from being selectionable */
        -webkit-user-select: none;
        user-select: none;
    }

    input, textarea {
        -webkit-user-select: auto;
        user-select: auto;
    }

    input:focus,
    select:focus,
    textarea:focus,
    button:focus {
        outline: none;
    }

    #app {
        width: 100%;
        height: 100%;
    }
`

export { GlobalStyles }
