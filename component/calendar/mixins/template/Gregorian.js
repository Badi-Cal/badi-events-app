/**
 * @fileoverview Sets properties specific to Calendar.vue
 */

const debug = require('debug')('calendar:Gregorian')

export default {
  data () {},
  computed: {
    workingDateGregorian: function () {
      return this.makeDT(this.workingDate)
    }
  },
  mounted () {
    debug('Component mounted')
  }
}
