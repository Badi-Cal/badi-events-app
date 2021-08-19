import { DateTime } from 'luxon'

const debug = require('debug')('calendar:CalendarMonth')

export default {
  props: {
    startDate: {
      type: [DateTime],
      default: () => { return DateTime.local() }
    }
  },
  methods: { },
  mounted () {
    debug('Component mounted')
  }
}
