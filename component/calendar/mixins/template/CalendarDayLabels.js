import BadiDate from 'utils/badidate'
import { DateTime } from 'luxon'

const debug = require('debug')('calendar:CalendarDayLabels')

export default {
  props: {
    startDate: {
      type: [Object, DateTime, BadiDate],
      default: () => { return DateTime.local() }
    },
    numberOfDays: {
      type: Number,
      default: 7
    },
    showDates: {
      type: Boolean,
      default: false
    },
    fullComponentRef: String,
    calendarLocale: {
      type: String,
      default: () => { return DateTime.local().locale }
    }
  },
  data () {
    return {
      dayCellHeight: 5,
      dayCellHeightUnit: 'rem',
      weekDateArray: []
    }
  },
  computed: {
    cellWidth: function () {
      return this.calculateDayCellWidth(this.numberOfDays)
    },
    calendarDaysAreClickable: function () {
      return (this.fullComponentRef && this.fullComponentRef.length > 0)
    }
  },
  methods: {
    handleStartChange: function (val, oldVal) {
      this.doUpdate()
    },
    doUpdate: function () {
      this.weekDateArray = this.buildWeekDateArray(this.numberOfDays)
    },
    isCurrentDayLabel: function (thisDay, checkMonthOnly) {
      if (checkMonthOnly === true) {
        return this.isCurrenMonth(thisDay)
      }
      else {
        return this.isCurrentDate(thisDay)
      }
    },
    // TODO: refactor this 2024.01.19 k rogers
    handleDayClick: function (dateObject) {
      debug('handleDayClick', dateObject)
    }
  },
  mounted () {
    debug('Component mounted')
    this.doUpdate()
  },
  watch: {
    startDate: 'handleStartChange'
  }
}
