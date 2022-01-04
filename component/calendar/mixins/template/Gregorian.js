/**
 * @fileoverview Sets properties for the Grerogian template child calendar
 */

const debug = require('debug')('calendar:Gregorian')

export default {
  data () {
    return {
      workingDate: this.makeDT(this.startDate)
    }
  },
  mounted () {
    debug('Component mounted')
  }
}
