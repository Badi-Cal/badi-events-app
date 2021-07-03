import dashHas from 'lodash.has'

const debug = require('debug')('calendar:Calendar')

export default {
  props: {
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
    moveTimePeriod: function (params) {
      debug('moveTimePeriod triggered with %s', params)

      if (dashHas(params, 'absolute')) {
        this.workingDate = this.makeDT(params.absolute)
      }
      else if (dashHas(this, 'workingDate')) {
        let paramObj = {}
        paramObj[params.unitType] = params.amount
        debug('this.workingDate = %s', this.workingDate)
        this.workingDate = this.workingDate.plus(paramObj)
      }
      else if (dashHas(this.$parent, 'workingDate')) {
        let paramObj = {}
        paramObj[params.unitType] = params.amount
        this.workingDate = this.$parent.workingDate.plus(paramObj)
      }
      else {
        let paramObj = {}
        paramObj[params.unitType] = params.amount
        debug('this.workingDate = %s', this.workingDate)
        this.workingDate = this.workingDate.plus(paramObj)
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
