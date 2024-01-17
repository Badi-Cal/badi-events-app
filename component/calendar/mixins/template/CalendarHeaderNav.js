import BadiDate from 'utils/badidate'
import { DateTime } from 'luxon'

const debug = require('debug')('calendar:CalendarHeaderNav')

export default {
  props: {
    timePeriodUnit: {
      type: String,
      default: 'days'
    },
    timePeriodAmount: {
      type: Number,
      default: 1
    },
    workingDate: {
      type: [Object, DateTime, BadiDate]
    }
  },
  inject: ['moveTimePeriodEmit'],
  methods: {
    /**
     * Navigates to new time period
     *
     * @param {int} amount
     * @param {Object} event
     *
     * @returns {void}
     */
    doMoveTimePeriod (amount, event) {
      const timePeriodAmount = amount * this.timePeriodAmount
      const params = this.moveTimePeriod(this.timePeriodUnit, timePeriodAmount)
      this.$router.push({
        params: params
      })
      this.$emit(
        this.moveTimePeriodEmit,
        params
      )
      debug('doMoveTimePeriod emited: ', this.moveTimePeriodEmit)
    },
    /**
     * Adds time units to workingDate
     *
     * Given parameters for Luxon Duration Object
     * add time units to workingDate
     * @see https://moment.github.io/luxon/api-docs/index.html#durationfromobject
     *
     * @param {str} unitType The unit of time
     * @param {int} amount The time period quantity
     *
     * @returns {Object}
     */
    moveTimePeriod: function (unitType, amount) {
      let dateObject = this.workingDate
      let paramObj = {}
      let routeParams = {
        year: dateObject.year,
        month: dateObject.month,
        day: dateObject.day
      }
      if (this.isCalendarDate(dateObject)) {
        debug('this.workingDate = %s', dateObject)
        // Object for Luxon Duration
        paramObj[unitType] = amount
        dateObject = dateObject.plus(paramObj)
        routeParams = {
          year: dateObject.year,
          month: dateObject.month,
          day: dateObject.day
        }
      }
      return routeParams
    }
  },
  mounted () {
    debug('Component mounted')
  }
}
