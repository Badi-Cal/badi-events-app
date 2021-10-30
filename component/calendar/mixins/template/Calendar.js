import dashHas from 'lodash.has'
import { DateTime } from 'luxon'
import BadiDate from 'utils/badidate'

const debug = require('debug')('calendar:Calendar')

export default {
  props: {
    startDate: {
      type: [Date],
      default: () => { return new Date() }
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
    }
  },
  data () {
    return {
      dayCellHeight: 5,
      dayCellHeightUnit: 'rem',
      parsed: {
        byAllDayStartDate: {},
        byStartDate: {},
        byId: {}
      },
      currentTab: 'tab-month',
      thisRefName: this.createRandomString(),
      workingDate: this.startDate
    }
  },
  computed: {
    workingDateTime () {
      return this.makeDT(this.workingDate)
    },
    workingDateBadi: function () {
      return new BadiDate(this.workingDateTime)
    }
  },
  methods: {
    setupEventsHandling: function () {
      this.$root.$on(
        this.eventRef + ':navMovePeriod',
        this.calPackageMoveTimePeriod
      )
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
    doUpdate: function () {
      this.mountSetDate()
    },
    /**
     * Adds time unit to workingDate data property
     *
     * @param {Object} params A Luxon Duration Object
     * @param {str} params.unitType The unit of time
     * @param {int} params.amount The time period quantity
     *
     */
    moveTimePeriod: function (params) {
      debug('moveTimePeriod triggered with %s', params)

      let dateObject = this.workingDate

      // first convert to Luxon DateTime
      if (dateObject instanceof Date) {
        dateObject = DateTime.fromJSDate(dateObject)
      }

      if (dashHas(this, 'workingDate')) {
        let paramObj = {}
        paramObj[params.unitType] = params.amount
        debug('this.workingDate = %s', this.workingDate)
        this.workingDate = dateObject.plus(paramObj)
      }
      else {
        debug('this.workingDate not on %s object', this)
      }
    }
  },
  mounted () {
    debug('Component mounted')
    this.parseEventList()
    this.setupEventsHandling()
  },
  watch: {
    startDate: function () {
      this.handleStartChange()
    },
    eventArray: function () {
      this.getPassedInEventArray()
    },
    parsedEvents: function () {
      this.getPassedInParsedEvents()
    }
  }
}
