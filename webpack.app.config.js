const { build } = require('tarot')
const IntouchThemePlugin = require('@intouchg/webpack-theme-plugin')
const IntouchSVGRPlugin = require('@intouchg/webpack-svgr-plugin')

module.exports = build({
    source: 'app',
    output: 'intouch-design-system.sketchplugin/Contents/Resources',
    entries: {
        'app-bundle': {
            file: 'index.tsx',
            usePolyfills: false,
        },
    },
    tsConfigPath: 'tsconfig.json',
    babelConfigPath: 'babel.config.js',
    eslintConfigPath: '.eslintrc.js',
    eslintFiles: [
        '*.tsx',
        'components',
        'hooks',
        'pages',
        'sketchApi',
        'store',
        'theme',
    ],
    plugins: [
        // new IntouchSVGRPlugin(),
        // new IntouchThemePlugin(),
    ],
})