/**
 * @fileoverview shared properties for Calendar,
 * CalendarAgenda, CalendarMonth and CalendarMultiday
 */
import { DateTime } from 'luxon'
export default {
  props: {
    parsedEvents: {
      type: Object,
      default: () => {}
    },
    eventRef: {
      type: String,
      default: () => { return 'cal-' + Math.random().toString(36).substring(2, 15) }
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
  methods: {
    doUpdate: () => {
      // this should be overridden
    }
  },
  mounted () {}
}
