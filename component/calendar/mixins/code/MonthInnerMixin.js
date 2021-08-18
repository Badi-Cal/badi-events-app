/**
 * @fileoverview Shared data and methods for CalendarMonthInnner, BadiMonthInner
 */

import DateTime from 'luxon/src/datetime'

export default {
  data () {
    return {
      dayCellHeight: 5,
      dayCellHeightUnit: 'rem',
      weekArray: [],
      parsed: this.getDefaultParsed(),
      eventDetailEventObject: {},
      eventClicked: false
    }
  },
  computed: {
    calendarDaysAreClickable: function () {
      return (this.fullComponentRef && this.fullComponentRef.length > 0)
    }
  },
  methods: {
    monthGetDateEvents: function (dateObject) {
      return this.dateGetEvents(dateObject)
    },
    doUpdate: function () {
      let payload = this.getWeekArrayDisplayDates(this.generateCalendarCellArray())
      this.triggerDisplayChange(
        this.eventRef,
        payload
      )
    },
    generateCalendarCellArray: function () {
      if (!(this.startDate instanceof DateTime)) {
        throw new TypeError('startDate prop not DateTime')
      }

      const month = this.startDate.month
      const year = this.startDate.year
      this.weekArray = this.getCalendarCellArray(
        month,
        year
      )
      return this.weekArray
    },
    handleNavMove: function (params) {
      this.$emit(
        this.eventRef + ':navMovePeriod',
        // {
        //   unitType: params.unitType,
        //   amount: params.amount
        // }
        params
      )
      let payload = this.getWeekArrayDisplayDates(this.generateCalendarCellArray())
      payload['moveUnit'] = params.unitType
      payload['moveAmount'] = params.amount
      this.triggerDisplayChange(
        this.eventRef,
        payload
      )
    },
    handleDayClick: function (dateObject) {
      // event item clicked; prevent "day" event
      if (this.eventClicked) {
        this.eventClicked = false
        return
      }
      if (this.fullComponentRef) {
        this.fullMoveToDay(dateObject)
      }
      this.handleNavMove({ absolute: dateObject })
      this.triggerDayClick(dateObject, this.eventRef)
    },
    handleCalendarEventClick: function () {
      this.eventClicked = true
    }
  },
  mounted () {
    this.doUpdate()
    this.handlePassedInEvents()
    this.$root.$on(
      this.eventRef + ':navMovePeriod',
      this.handleNavMove
    )
    this.$root.$on(
      'click-event-' + this.eventRef,
      this.handleEventDetailEvent
    )
    this.$root.$on(
      'update-event-' + this.eventRef,
      this.handleEventUpdate
    )
  }
}
