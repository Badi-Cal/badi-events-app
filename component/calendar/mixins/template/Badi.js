/**
 * @fileoverview Sets properties specific to the BadiCalendar.vue
 */
import { badiDateSettings } from 'badidate'

const debug = require('debug')('calendar:Badi')

export default {
  created () {
    badiDateSettings({
      defaultLanguage: this.$props.calendarLocale
    })
  },
  mounted () {
    debug('Component mounted')
  }
}
