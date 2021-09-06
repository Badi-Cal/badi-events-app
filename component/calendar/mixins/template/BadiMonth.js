import { BadiDate } from 'badidate'
import { DateTime } from 'luxon'

const debug = require('debug')('calendar:BadiMonth')

export default {
  props: {
    startDate: {
      type: [BadiDate],
      default: () => { return new BadiDate(DateTime.local()) }
    }
  },
  methods: { },
  mounted () {
    debug('Component mounted')
  }
}
