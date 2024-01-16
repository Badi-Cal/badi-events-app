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
    }
  },
  inject: ['moveTimePeriodEmit'],
  methods: {
    doMoveTimePeriod (timePeriodUnit, timePeriodAmount) {
      debug('doMoveTimePeriod emited: ', this.moveTimePeriodEmit)
      this.$emit(
        this.moveTimePeriodEmit,
        {
          unitType: timePeriodUnit,
          amount: timePeriodAmount
        }
      )
    }
  },
  mounted () {
    debug('Component mounted')
  }
}
