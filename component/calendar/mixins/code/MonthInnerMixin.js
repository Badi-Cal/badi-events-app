/**
 * @fileoverview Shared data and methods for CalendarMonthInnner, BadiMonthInner
 */

export default {
  data () {
    return {
      dayCellHeight: 5,
      dayCellHeightUnit: 'rem',
      eventDetailEventObject: {},
      eventClicked: false
    }
  },
  computed: {
    calendarDaysAreClickable: function () {
      return (this.fullComponentRef && this.fullComponentRef.length > 0)
    },
    /**
     * Get calandar date for week in month.
     *
     * @returns {Array<Array<Object>>}
     */
    weekArray: function () {
      return this.getCalendarCellArray(
        this.startDate.month,
        this.startDate.year
      )
    }
  },
  methods: {
    // TODO: refactor this 2024.01.19 k. rogers
    handleDayClick: function (dateObject) {
      // event item clicked; prevent "day" event
      if (this.eventClicked) {
        this.eventClicked = false
        return
      }
      this.triggerDayClick(dateObject, this.eventRef)
    },
    handleCalendarEventClick: function () {
      this.eventClicked = true
    }
  },
  mounted () {
    this.handlePassedInEvents()
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
