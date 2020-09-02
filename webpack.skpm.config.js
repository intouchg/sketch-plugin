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

  const msalServerModulePath = path.resolve('node_modules/@i/msal-server')

  config.plugins.push(new PluginCopy({
    patterns: [
      {
        from: `${msalServerModulePath}/cli.cjs.js`,
        to: 'msal-server/msal-server-cli.cjs.js',
      },
      {
        from: `${msalServerModulePath}/dist/index.cjs.js`,
        to: 'msal-server/dist/index.cjs.js',
      },
    ],
  }))

  config.plugins.push(new PluginESLint({
    fix: true,
    files: 'src',
    configFile: path.resolve('.eslintrc.js'),
  }))
}
