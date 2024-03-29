/* eslint-env node */
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// cypress/plugins/index.js

require('dotenv').config({ path: '.env.dev' })

module.exports = (on, config) => {
  const debug = require('debug')('tests:cypress')
  // copy any needed variables from process.env to config.env
  config.env.appVersion = process.env.APP_VERSION

  if (debug.enabled) {
    debug(config)
  }

  // do not forget to return the changed config object!
  return config
}
