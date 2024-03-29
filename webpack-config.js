// Shared webpack configuration
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = function (cfg) {
  cfg.module.rules.push(
    {
      enforce: 'pre',
      test: /\.(js|vue)$/,
      use: 'eslint-loader',
      exclude: /(node_modules|quasar|\.storybook)/
    }
  )
  cfg.resolve.alias = {
    ...cfg.resolve.alias,
    src: path.resolve(__dirname, './src'),
    components: path.resolve(__dirname, './component'),
    layouts: path.resolve(__dirname, './src/layouts'),
    pages: path.resolve(__dirname, './src/pages'),
    assets: path.resolve(__dirname, './src/assets'),
    boot: path.resolve(__dirname, './boot'),
    templates: path.resolve(__dirname, './component/calendar/templates'),
    mixins: path.resolve(__dirname, './component/calendar/mixins'),
    utils: path.resolve(__dirname, './utils')
  }
  cfg.plugins.push(
    new CopyPlugin([
      { from: 'src/statics', to: 'statics' }
    ])
  )
  return cfg
}
