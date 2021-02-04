const { build } = require('tarot')
const IntouchThemePlugin = require('@i/webpack-theme-plugin')
const IntouchSVGRPlugin = require('@i/webpack-svgr-plugin')

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
    plugins: [
        new IntouchSVGRPlugin(),
        new IntouchThemePlugin(),
    ],
})