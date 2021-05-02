// Shared webpack configuration
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = function (cfg) {
  cfg.module.rules.push(
    {
      enforce: 'pre',
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      exclude: /(node_modules|quasar)/
    },
    {
      test: /\.styl$/,
      loader: 'stylus-loader', // compiles Styl to CSS
      include: [
        path.resolve(__dirname, './src/css'),
        path.resolve(__dirname, './component/calendar/styles-common')
      ]
    }
  )
  cfg.resolve.alias = {
    ...cfg.resolve.alias,
    src: path.resolve(__dirname, './src'),
    components: path.resolve(__dirname, './component'),
    layouts: path.resolve(__dirname, './src/layouts'),
    pages: path.resolve(__dirname, './src/pages'),
    assets: path.resolve(__dirname, './src/assets'),
    boot: path.resolve(__dirname, './boot')
  }
  cfg.plugins.push(
    new CopyPlugin([
      { from: 'src/statics', to: 'statics' }
    ])
  )
  return cfg
}
