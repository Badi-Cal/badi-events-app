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
      return `${this.calEventRef}:navMoveTimePeriod`
    },
    changeCalPeriodEmit: function () {
      return `${this.calEventRef}:navChangeCalendarPeriod`
    }
  },
  provide () {
    return {
      'moveTimePeriodEmit': this.moveTimePeriodEmit,
      'changeCalendarPeriodEmit': this.changeCalPeriodEmit
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
          multiday: '3 Day',
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
    /**
     * Callback to change calendar period (month, week, day)
     *
     * @param {string} view
     *
     * @returns {void}
     */
    doChangeCalPeriod: function (view, event) {
      const params = {
        period: view,
        ...new this.RouteParams(
          this.startDate.year,
          this.startDate.month,
          this.startDate.day
        )
      }
      this.$router.push({
        params: params
      })
      debug('router push with params: ', params)
      this.$emit(
        this.changeCalPeriodEmit,
        params
      )
      debug('changeCalendarPeriod emitted: ', this.changeCalPeriodEmit)
    }
  },
  mounted () {
    debug('Component mounted')
    this.setupEventsHandling()
  }
}
