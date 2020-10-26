const path = require('path')
const PluginESLint = require('eslint-webpack-plugin')
const PluginCopy = require('copy-webpack-plugin')

module.exports = function (config, entry) {
  config.node = entry.isPluginCommand ? false : { setImmediate: false }

  config.module.rules.push(
    {
      test: /\.(html)$/,
      use: [
        { loader: '@skpm/extract-loader' },
        {
          loader: 'html-loader',
          options: {
            attrs: [
              'img:src',
              'link:href'
            ],
            interpolate: true,
          },
        },
      ]
    },
    {
      test: /\.(css)$/,
      use: [
        { loader: '@skpm/extract-loader' },
        { loader: 'css-loader' },
      ]
    },
  )

  const adalServerModulePath = path.resolve('node_modules/@i/adal-server')
  const fontbookParserModulePath = path.resolve('node_modules/@i/fontbook-parser')

  config.plugins.push(new PluginCopy({
    patterns: [
      {
        from: `${adalServerModulePath}/lib/`,
        to: 'adal-server/',
      },
      {
        from: `${fontbookParserModulePath}/lib/`,
        to: 'fontbook-parser/',
      },
    ],
  }))

  config.plugins.push(new PluginESLint({
    fix: true,
    files: 'src',
    overrideConfigFile: path.resolve('.eslintrc.js'),
  }))
}
