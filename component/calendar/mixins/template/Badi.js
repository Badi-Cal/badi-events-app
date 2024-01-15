/**
 * @fileoverview Sets properties specific to the BadiCalendar.vue
 */
import BadiDate from 'utils/badidate'
import { badiDateSettings } from 'badidate'

const debug = require('debug')('calendar:Badi')

export default {
  data () {},
  computed: {
    workingDateBadi: function () {
      return new BadiDate(this.makeDT(this.workingDate))
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
