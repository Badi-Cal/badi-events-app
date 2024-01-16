import { DateTime } from 'luxon'

const debug = require('debug')('calendar:CalendarMonth')

export default {
  props: {
    startDate: {
      type: [Object, DateTime],
      default: () => { return DateTime.local() }
    }
  },
  data: function () {
    return {
      workingDate: this.startDate
    }
  },
  inject: ['moveTimePeriodEmit'],
  methods: {},
  mounted () {
    debug('Component mounted')
  }
}
