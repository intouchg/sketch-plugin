const { build } = require('tarot')

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
})