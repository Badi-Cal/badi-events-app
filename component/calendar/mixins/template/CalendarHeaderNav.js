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
      let routeParams = new this.RouteParams(
        dateObject.year,
        dateObject.month,
        dateObject.day
      )
      if (this.isCalendarDate(dateObject)) {
        debug('this.workingDate = %o', dateObject)
        // Object for Luxon Duration
        paramObj[unitType] = amount
        dateObject = dateObject.plus(paramObj)
        routeParams = {
          ...new this.RouteParams(
            dateObject.year,
            dateObject.month,
            dateObject.day
          )
        }
      }
      return routeParams
    },
    /**
     * Constructs RouteParams object for route
     *
     * @param {number} year
     * @param {number} month
     * @param {number} day
     */
    RouteParams: function (year, month, day) {
      this.year = year
      this.month = month
      this.day = day
    }
  },
  mounted () {
    debug('Component mounted')
  }
}
