// Configuration for your app
const extendWebpack = require('./webpack-config.js')

module.exports = function (ctx) {
  return {
    boot: [],
    plugins: [],
    sourceFiles: {
      rootComponent: 'src/App.vue',
      router: 'src/router/index.js',
      // store: 'src/store/index.js',
      indexHtmlTemplate: 'src/index.template.html'
    },
    css: [
      'app.styl'
      // 'component/calendar/styles-common/app.styl',
      // 'component/calendar/styles-common/calendar.vars.styl'
    ],
    animations: [
      'fadeInLeft',
      'fadeOutLeft'
    ],
    extras: [
      'roboto-font',
      'material-icons' // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons'
    ],
    // framework: 'all', // --- includes everything; for dev only!
    framework: {
      plugins: [
        'Notify'
      ],
      directives: [
        'Ripple'
      ]
    },
    supportIE: false,
    build: {
      scopeHoisting: true,
      extendWebpack
    },
    devServer: {
      // https: true,
      port: 8084,
      open: false // opens browser window automatically
    },
    ssr: {
      pwa: false
    },
    pwa: {
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3'
      }
    }
  }
}
