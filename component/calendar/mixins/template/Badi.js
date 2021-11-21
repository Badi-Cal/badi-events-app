/**
 * @fileoverview Sets properties specific to Badi template child component instances
 */
import BadiDate from 'utils/badidate'
import { badiDateSettings } from 'badidate'

const debug = require('debug')('calendar:Badi')

export default {
  computed: {
    workingDateBadi: function () {
      return new BadiDate(this.workingDateTime)
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
