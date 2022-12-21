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
    weekArray: function () {
      return this.getCalendarCellArray(
        this.startDate.month,
        this.startDate.year
      )
    }
  },
  methods: {
    monthGetDateEvents: function (dateObject) {
      return this.dateGetEvents(dateObject)
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
