/**
 * @fileoverview shared properties for Calendar,
 * CalendarAgenda, CalendarMonth and CalendarMultiday
 */
import { DateTime } from 'luxon'
export default {
  props: {
    parsedEvents: {
      type: Object,
      default: () => {
        return {
          byAllDayStartDate: {},
          byAllDayObject: {},
          byStartDate: {},
          byId: {}
        }
      }
    },
    // TODO: deprecate this 2024-01-17 k.rogers
    eventRef: {
      type: String,
      default: 'cal-eventRef'
    },
    preventEventDetail: {
      type: Boolean,
      default: false
    },
    calendarLocale: {
      type: String,
      default: () => { return DateTime.local().locale }
    },
    calendarTimezone: {
      type: String,
      default: () => { return DateTime.local().zoneName }
    },
    allowEditing: {
      type: Boolean,
      default: false
    },
    renderHtml: {
      type: Boolean,
      default: false
    },
    dayDisplayStartHour: {
      type: Number,
      default: 7
    },
    fullComponentRef: String
  },
  mounted () {}
}
