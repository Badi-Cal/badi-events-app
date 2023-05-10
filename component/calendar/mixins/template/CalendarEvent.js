import dashHas from 'lodash.has'
import { DateTime } from 'luxon'
import BadiDate from 'utils/badidate'

const debug = require('debug')('calendar:CalendarEvent')

export default {
  props: {
    forceAllDay: Boolean,
    currentCalendarDay: [DateTime, BadiDate],
    hasPreviousDay: Boolean,
    hasNextDay: Boolean,
    firstDayOfWeek: Boolean,
    lastDayOfWeek: Boolean,
    renderStyle: {
      type: String,
      default: 'singleLine'
    },
    isLeftmostColumn: {
      type: Boolean,
      default: false
    },
    /** @desc A parsed event. */
    eventObject: Object
  },
  methods: {
    getEventStyle: function () {
      return {
        // 'background-color': this.backgroundColor,
        // 'color': this.textColor
      }
    },
    getEventClass: function () {
      return this.addCssColorClasses(
        {
          'calendar-event': true,
          'calendar-event-month': this.monthStyle,
          'calendar-event-multi': !this.monthStyle,
          'calendar-event-multi-allday': this.forceAllDay,
          'calendar-event-has-next-day': this.eventHasNextDay(),
          'calendar-event-has-previous-day': this.eventHasPreviousDay(),
          'calendar-event-empty-slot': this.isEmptySlot(),
          'calendar-event-continues-next-week': this.eventContinuesNextWeek(), // for future use
          'calendar-event-continues-from-last-week': this.eventContinuesFromLastWeek() // for future use
        },
        this.eventObject
      )
    },
    isEmptySlot: function () {
      return this.eventObject.start.isEmptySlot
    },
    eventContinuesNextWeek: function () {
      /** @type {DateTime} */
      const dateObject = this.eventObject.start.dateObject
      return (
        dashHas(this.eventObject, 'start.dateObject') &&
        this.monthStyle &&
        this.eventHasNextDay() &&
        (this.lastDayOfWeek || this.isLastDayOfMonth(dateObject))
      )
    },
    eventContinuesFromLastWeek: function () {
      /** @type {DateTime} */
      const dateObject = this.eventObject.start.dateObject
      return (
        dashHas(this.eventObject, 'start.dateObject') &&
        this.monthStyle &&
        this.eventHasPreviousDay() &&
        (this.firstDayOfWeek || this.isFirstDayOfMonth(dateObject))
      )
    },
    /**
     * True if current calendar day is last day of event's month
     *
     * @param {DateTime} dateObject
     * @returns {boolean}
     */
    isLastDayOfMonth: function (dateObject) {
      if (typeof dateObject === 'undefined' || dateObject === null) {
        return false
      }
      return this.currentCalendarDay.toISODate() === dateObject.endOf('month').toISODate()
    },
    /**
     * True if current calendar day is first day of the event's month
     *
     * @param {DateTime} dateObject
     * @returns {boolean}
     */
    isFirstDayOfMonth: function (dateObject) {
      if (typeof dateObject === 'undefined' || dateObject === null) {
        return false
      }
      return this.currentCalendarDay.toISODate() === dateObject.startOf('month').toISODate()
    },
    eventHasNextDay: function () {
      if (this.hasNextDay) {
        return this.hasNextDay
      }
      return false
    },
    eventHasPreviousDay: function () {
      if (this.hasPreviousDay) {
        return this.hasPreviousDay
      }
      return false
    },
    isAllDayEvent: function () {
      return this.eventObject.start.isAllDay
    },
    eventDuration: function () {
      return this.getEventDuration(this.eventObject.start.dateObject, this.eventObject.end.dateObject)
    },
    handleClick: function (e) {
      this.eventObject.allowEditing = this.allowEditing
      this.$emit('click', this.eventObject)
      this.triggerEventClick(this.eventObject, this.eventRef)
    }
  },
  mounted () {
    debug('Component mounted')
  }
}
