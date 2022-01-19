/**
 * @fileoverview Sets properties specific to Badi template child component instances
 */
import BadiDate from 'utils/badidate'
import { badiDateSettings } from 'badidate'

const debug = require('debug')('calendar:Badi')

export default {
  data () {
    return {
      workingDate: new BadiDate(this.makeDT(this.startDate))
    }
  },
  created () {
    badiDateSettings({
      defaultLanguage: this.$props.calendarLocale
    })
  },
  mounted () {
    debug('Component mounted')
  }
}
