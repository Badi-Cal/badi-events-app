/**
 * @fileoverview Shared code for manipulating parsed event object.
 */
import dashHas from 'lodash.has'
import { DateTime } from 'luxon'
import BadiDate from 'utils/badidate'

const defaultParsed = {
  byAllDayStartDate: {},
  byAllDayObject: {},
  byStartDate: {},
  byId: {}
}

export default {
  computed: {},
  methods: {

    /**
     * Returns ISO-8601 string representation of Date
     *
     * @param {DateTime|BadiDate} dateObject
     * @returns {string}
     */
    formatToSqlDate: function (dateObject) {
      if (dateObject instanceof BadiDate) {
        return dateObject.format('yy-mm-dd')
      }
      return dateObject.toISODate()
    },
    getEventById: function (eventId) {
      return this.parsedEvents.byId[eventId]
    },
    /**
     * Get parsed events for this date.
     *
     * @param {DateTime|BadiDate} thisDate
     * @param {boolean} skipSlotIndicators
     * @returns {Array} Parsed events
     */
    dateGetEvents: function (thisDate, skipSlotIndicators) {
      let hasAllDayEvents = this.hasAllDayEvents(thisDate)
      let hasEvents = this.hasEvents(thisDate)
      let returnArray = []
      let isoDate = thisDate.toISODate()
      if (hasAllDayEvents) {
        let transferFields = ['daysFromStart', 'durationDays', 'hasNext', 'hasPrev', 'slot']
        // build temp object with slot IDs
        let slotObject = {}
        let maxSlot = 0
        for (let thisEvent of this.parsedEvents.byAllDayObject[isoDate]) {
          slotObject[thisEvent.slot] = thisEvent
          if (thisEvent.slot > maxSlot) {
            maxSlot = thisEvent.slot
          }
        }
        // now we have it sorted but have to fill in any gaps
        for (let counter = 0; counter <= maxSlot; counter++) {
          let tempObject = {}
          if (dashHas(slotObject, counter)) {
            // this element exists
            tempObject = this.getEventById(slotObject[counter].id)
            for (let thisField of transferFields) {
              tempObject[thisField] = slotObject[counter][thisField]
            }
          }
          else {
            // this is an empty slot
            tempObject = {
              slot: counter,
              start: {
                isAllDay: true,
                isEmptySlot: true
              }
            }
          }
          if (skipSlotIndicators && tempObject.slot) {
            // bypass this - we don't want slot indicators
          }
          else {
            returnArray.push(tempObject)
          }
        }
      }

      if (hasEvents) {
        for (let thisEvent of this.parsedEvents.byStartDate[isoDate]) {
          returnArray.push(this.getEventById(thisEvent))
        }
      }
      return returnArray
    },
    /**
     * Check if this date has events.
     *
     * @param {DateTime|BadiDate} thisDateObject
     * @returns {boolean}
     */
    hasAnyEvents: function (thisDateObject) {
      return (
        this.hasEvents(thisDateObject) ||
        this.hasAllDayEvents(thisDateObject)
      )
    },
    hasAllDayEvents: function (thisDateObject) {
      const isoDate = thisDateObject.toISODate()
      return dashHas(
        this.parsedEvents.byAllDayObject,
        isoDate
      )
    },
    hasEvents: function (thisDateObject) {
      const isoDate = thisDateObject.toISODate()
      const startDateObject = this.parsedEvents.byStartDate
      return dashHas(
        startDateObject,
        isoDate
      )
    },
    /**
     * True if date has multiday event from previous day.
     *
     * @param {number} id Event id
     * @param {DateTime|BadiDate} thisDayObject
     * @returns {boolean}
     */
    eventIsContinuedFromPreviousDay (id, thisDayObject) {
      const isoDate = thisDayObject.toISODate()
      return (
        dashHas(this.parsedEvents['byContinuedNextDay'], isoDate) &&
        this.parsedEvents['byContinuedNextDay'][isoDate].includes(id)
      )
    },

    getPassedInParsedEvents: function () {
      let parsed = defaultParsed
      if (
        this.parsedEvents !== undefined &&
        this.parsedEvents.byId !== undefined &&
        Object.keys(this.parsedEvents).length > 0
      ) {
        parsed = this.parsedEvents
      }

      return parsed
    },
    getDefaultParsed: function () {
      return defaultParsed
    },
    isParsedEventsEmpty: function () {
      return !(
        this.parsedEvents !== undefined &&
        this.parsedEvents.byId !== undefined &&
        Object.keys(this.parsedEvents).length > 0
      )
    },
    handlePassedInEvents: function () {
      if (!this.isParsedEventsEmpty()) {
        this.getPassedInParsedEvents()
      }
    },
    formatTimeRange: function (startTime, endTime) {
      let returnString = ''
      // start time
      returnString += this.simplifyTimeFormat(
        this.makeDT(startTime).toLocaleString(DateTime.TIME_SIMPLE),
        (this.formatDate(startTime, 'a') === this.formatDate(endTime, 'a'))
      )
      returnString += ' - '
      // end time
      returnString += this.simplifyTimeFormat(
        this.makeDT(endTime).toLocaleString(DateTime.TIME_SIMPLE),
        false
      )
      return returnString
    },
    formatTime: function (startTime) {
      let returnString = this.makeDT(startTime).toLocaleString(DateTime.TIME_SIMPLE)
      // simplify if AM / PM present
      if (returnString.includes('M')) {
        returnString = returnString.replace(':00', '') // remove minutes if = ':00'
          .replace(' AM', 'am')
          .replace(' PM', 'pm')
      }
      return returnString
    },
    /**
     * Computes length of duration.
     *
     * @param {Date} startTime
     * @param {Date} endTime
     * @param {string} units
     *
     * @returns {string} Duration in minutes or given unit argument.
     */
    getEventDuration: function (startTime, endTime, units = 'minutes') {
      return Math.floor(
        this.makeDT(endTime).diff(this.makeDT(startTime)).as(units)
      )
    }
  },
  mounted () {}
}
