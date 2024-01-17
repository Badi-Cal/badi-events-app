/**
 * @fileoverview Sets properties specific to Calendar.vue
 */

const debug = require('debug')('calendar:Gregorian')

export default {
  computed: {
    workingDateGregorian: function () {
      return this.makeDT(this.startDate)
    }
  },
  mounted () {
    debug('Component mounted')
  }
}
