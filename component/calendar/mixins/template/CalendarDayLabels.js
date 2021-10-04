import { BadiDate } from 'badidate'
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
    forceStartOfWeek: {
      type: Boolean,
      default: false
    },
    fullComponentRef: String,
    sundayFirstDayOfWeek: {
      type: Boolean,
      default: false
    },
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
      let now = DateTime.local()
      thisDay = this.makeDT(thisDay)
      if (checkMonthOnly === true) {
        return (
          now.weekday === thisDay.weekday &&
          now.month === thisDay.month
        )
      }
      else {
        return now.hasSame(thisDay, 'day')
      }
    },
    handleDayClick: function (dateObject) {
      if (this.fullComponentRef) {
        this.fullMoveToDay(dateObject)
      }
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
