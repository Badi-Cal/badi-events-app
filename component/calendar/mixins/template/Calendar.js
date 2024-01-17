import BadiDate from 'utils/badidate'
import { DateTime } from 'luxon'

/**
 * @fileoverview shared properties for Calendar.vue,
 * BadiCalendar.vue
 */
const debug = require('debug')('calendar:Calendar')

export default {
  data () {
    return {
      dayCellHeight: 5,
      dayCellHeightUnit: 'rem',
      currentTab: 'tab-month',
      thisRefName: this.createRandomString()
    }
  },
  computed: {
    calEventRef: function () {
      return `cal-${this.thisRefName}`
    },
    moveTimePeriodEmit: function () {
      return `${this.calEventRef}:navMovePeriod`
    }
  },
  provide () {
    return {
      'moveTimePeriodEmit': this.moveTimePeriodEmit
    }
  },
  props: {
    startDate: {
      type: [DateTime, BadiDate]
    },
    tabLabels: {
      type: Object,
      default: () => {
        return {
          month: 'Month',
          week: 'Week',
          threeDay: '3 Day',
          day: 'Day',
          agenda: 'Agenda'
        }
      }
    },
    calendarTab: {
      type: String,
      default: 'tab-month'
    }
  },
  methods: {
    createRandomString: function () {
      return Math.random().toString(36).substring(2, 15)
    },
    setupEventsHandling: function () {
      // TODO: deprecate this 2024-01-15 k.rogers
      this.$on(
        this.moveTimePeriodEmit,
        this.moveTimePeriod
      )
      // TODO: deprecate this 2024-01-13 k.rogers
      // and remove switchToSingleDay
      this.$root.$on(
        this.eventRef + ':moveToSingleDay',
        this.switchToSingleDay
      )
      this.$root.$on(
        'update-event-' + this.eventRef,
        this.handleEventUpdate
      )
      this.$root.$on(
        'move-time-period-' + this.eventref,
        this.moveTimePeriod
      )
      this.$root.$on(
        'set-time-period-' + this.eventref,
        this.setTimePeriod
      )
    },
    // TODO: deprecate this 2024-01-14 k.rogers
    // moved to CalendarHeaderNav.js
    calPackageMoveTimePeriod: function (params) {
      this.moveTimePeriod(params)
      this.$emit(
        'calendar' + ':navMovePeriod',
        params
      )
    },
    switchToSingleDay: function (params) {
      debug('switchToSingleDay triggered with %s', params)

      this.workingDate = params.dateObject
      this.currentTab = 'tab-single-day-component'
    },
    // TODO: deprecate this 2024-01-14 k.rogers
    doUpdate: function () {
      this.mountSetDate()
    }
  },
  mounted () {
    debug('Component mounted')
    this.setupEventsHandling()
  },
  watch: {
    // TODO: deprecate this 2024-01-14 k.rogers
    startDate: function () {
      this.handleStartChange()
    }
  }
}
