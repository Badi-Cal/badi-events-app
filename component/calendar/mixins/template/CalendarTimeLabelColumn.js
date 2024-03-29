import { DateTime } from 'luxon'

// eslint-disable-next-line no-unused-vars
const debug = require('debug')('calendar:CalendarTimeLabelColumn')

export default {
  props: {
    dayCellHeight: {
      type: [Number, String],
      default: 5
    },
    dayCellHeightUnit: {
      type: String,
      default: 'rem'
    },
    calendarLocale: {
      type: String,
      default: () => { return DateTime.local().locale }
    },
    showHalfHours: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    calcDayCellHeight: function () {
      if (this.showHalfHours) {
        return (this.dayCellHeight / 2) + this.dayCellHeightUnit
      }
      else {
        return this.dayCellHeight + this.dayCellHeightUnit
      }
    }
  }
}
