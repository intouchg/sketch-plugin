const path = require('path')
const PluginESLint = require('eslint-webpack-plugin')

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
  config.plugins.push(new PluginESLint({
    fix: true,
    files: 'src',
    configFile: path.resolve('.eslintrc.js'),
  }))
}
