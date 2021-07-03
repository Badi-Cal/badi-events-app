const webpackConfig = require('../webpack-config.js')
const path = require('path')

module.exports = {
  stories: [
    '../component/stories/*.stories.@(js)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-actions'
  ],
  webpackFinal: function (config) {
    config.module.rules.push(
      {
        test: /\.styl(us)?$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
              stylusOptions: {
                paths: [ path.resolve(__dirname, '../node_modules') ]
              }
            }
          }
        ]
      }
    )

    config.resolve.modules.push(
      path.resolve(__dirname, '../node_modules')
    )

    let customCfg = webpackConfig(config)

    return {
      ...config,
      module: { ...config.module, rules: customCfg.module.rules },
      resolve: { ...config.resolve, alias: customCfg.resolve.alias }
    }
  }
}
