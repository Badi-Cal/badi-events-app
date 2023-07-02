/**
 * @fileoverview Code for parsing raw event data
 */

import dashHas from 'lodash.has'
import { DateTime } from 'luxon'
import Interval from 'luxon/src/interval'

const gridBlockSize = 5 // the number here is how many minutes for each block to use when calculating overlaps

export default {
  computed: {},
  methods: {
    clearParsed: function () {
      this.parsed = {
        byAllDayStartDate: {},
        byAllDayObject: {},
        byStartDate: {},
        byId: {},
        byMultiDay: {},
        byNextDay: {},
        byContinuedMultiDay: {},
        byContinuedNextDay: {}
      }
      return true
    },

    /**
     * Make Luxon DateTime object in the given time zone.
     *
     * @param {DateTime} dateObject
     * @param {string} timeZone
     *
     * @returns {DateTime} A time zone dependent Luxon DateTime object.
     */
    moveToDisplayZone: function (dateObject, timeZone) {
      return this.makeDT(dateObject, timeZone)
    },
    /**
     * Set event's dateObject property to DateTime in the given time zone.
     *
     * @param {Object} event Event's start or end date.
     * @param {*} dateObject
     * @param {*} timeZone
     */
    setEventDateObject: function (event, dateObject, timeZone) {
      event['dateObject'] = this.makeDT(dateObject, timeZone)
    },
    /***
     * Computes duration between end and start dates.
     *
     * Assigned difference between event's end DateTimes and
     * state DateTime to the event's durationDays property.
     *
     * @param {Oject} event GCal event object.
     * @param {DateTime} event.start.dateObject Event's start date.
     * @param {DateTime} event.end.dateObject Event's end date.
     */
    setEventDurationDays: function (event, start, end) {
      event['durationDays'] = Math.ceil(
        event.end.dateObject
          .diff(event.start.dateObject)
          .as('days')
      )
    },
    /**
     * Set's start isAllDay property.
     *
     * @param {Object} event Event's start date.
     * @param {boolean} flag True if event is all day event.
     */
    setEventAllDay: function (event, flag = true) {
      event['isAllDay'] = flag
    },
    /**
     * Get event's start isAllDay property.
     *
     * @param {Object} event Event's start date.
     *
     * @returns {boolean} True if all day event
     */
    isEventAllDay: function (event) {
      return event['isAllDay'] ?? false
    },
    /**
     * Sets value of event's timeSpansMultipleDays property
     * or timeSpansOvernight property
     *
     * @param {Object} event GCal event object.
     */
    setEventTimeSpan: function (event) {
      const duration = event['durationDays'] ?? 0

      if (duration > 2) {
        event['timeSpansMultipleDays'] = true
      }
      else if (duration === 1) {
        event['timeSpansOvernight'] = true
      }
    },
    /**
     * Creates Luxon DateTime objects and adjust the time zone.
     * @param {Object} event GCal event object.
     */
    createEventDateTimes: function (event) {
      if (dashHas(event.start, 'date')) {
        // this is an all day(s) event
        this.createAllDayEvent(event)
      }

      if (dashHas(event.start, 'dateTime')) {
        // this event has a specific start and end time
        this.createDayEvent(event)
      }
    },
    /**
     * Creates Luxon DateTime objects for all day events.
     *
     * Use the event's ISO date strings to create two Luxon DateTime objects
     * that range from the event's start date to end date and adjusts the events
     * time zone.
     *
     * @param {Object} event GCal event object.
     */
    createAllDayEvent: function (event) {
      // use local zone if no input is specified
      const startZone = event.start.timeZone ?? 'local'
      const endZone = event.end.timeZone ?? 'local'
      const start = DateTime.fromISO(event.start.date, { zone: startZone }).startOf('day')
      const end = DateTime.fromISO(event.end.date, { zone: endZone }).endOf('day')

      // assign Luxon DateTime to dateObject property
      this.setEventDateObject(event.start, start, this.calendarTimezone)
      this.setEventDateObject(event.end, end, this.calendarTimezone)

      // Set the start object's all day flag to true and
      // compute duration between end and start date
      this.setEventDurationDays(event)
      this.setEventAllDay(event.start, true)
    },
    /**
     * Creates Luxon DateTime objects for day events.
     *
     * @param {Object} event GCal event object.
     *
     * Use the event's ISO date strings to create two Luxon DateTime objects
     * that range from the the first second of the start date until the
     * last second of the end date and adjust the events timezones.
     */
    createDayEvent: function (event) {
      // use local zone if no input is specified
      const startZone = event.start.timeZone ?? 'local'
      const endZone = event.end.timeZone ?? 'local'
      const start = DateTime.fromISO(event.start.dateTime, { zone: startZone })
      const end = DateTime.fromISO(event.end.dateTime, { zone: endZone })

      // assign Luxon DateTime to dateObject property
      this.setEventDateObject(event.start, start, startZone)
      this.setEventDateObject(event.end, end, endZone)

      // put in duration for multiday events with an associated time
      if (event.start.dateObject.toISODate() !== event.end.dateObject.toISODate()) {
        this.setEventDurationDays(event)
        this.setEventTimeSpan(event)
      }
    },
    addMultiDayEvents: function (event) {
      for (let dayAdd = 0; dayAdd < event.durationDays; dayAdd++) {
        let innerStartDate = event.start.dateObject
          .plus({ days: dayAdd })
          .toISODate()
        // TODO: dead code that is never used by other code (kenny 2023.07.02)
        this.addToParsedList('byAllDayStartDate', innerStartDate, event.id)
        // newer all-day events routine
        this.addToParsedList(
          'byAllDayObject',
          innerStartDate,
          {
            id: event.id,
            hasPrev: (dayAdd > 0),
            hasNext: (dayAdd < (event.durationDays - 1)),
            hasPreviousDay: (dayAdd > 0),
            hasNextDay: (dayAdd < (event.durationDays - 1)),
            durationDays: event.durationDays,
            startDate: event.start.dateObject,
            daysFromStart: dayAdd
          }
        )
      }
    },

    /**
     *
     * @param {Object} thisEvent GCal Event object.
     * @param {string} thisStartDate ISO 8601 representation of date.
     */
    addSingleDayEvent: function (thisEvent, thisStartDate) {
      const thisStartDateObj = thisEvent.start.dateObject
      const thisEndDateObj = thisEvent.end.dateObject

      thisEvent.durationMinutes = this.parseGetDurationMinutes(thisEvent)
      this.addToParsedList('byStartDate', thisStartDate, thisEvent.id)

      if (thisStartDateObj.toISODate() !== thisEndDateObj.toISODate()) {
        // this is a date where the time is set and spans across more than one day

        // TODO: dead code that is never executed from parseEventList branch (kenny 2023.07.02)
        if (this.getEventDuration(thisStartDateObj, thisEndDateObj, 'days') > 1) {
          // this event spans multiple days
          this.addToParsedList('byMultiDay', thisStartDate, thisEvent.id)
          this.addToParsedList('byAllDayObject', thisStartDate, thisEvent.id)
          this.addToParsedList('byAllDayStartDate', thisStartDate, thisEvent.id)
          let multiDate = thisEvent.start.dateObject
          while (multiDate.toISODate() !== thisEvent.end.dateObject.toISODate()) {
            multiDate = multiDate.plus({ days: 1 })
            this.addToParsedList('byContinuedMultiDay', multiDate.toISODate(), thisEvent.id)
            this.addToParsedList('byAllDayObject', thisStartDate, thisEvent.id)
          }
        }
        else {
          // this event crosses into the next day
          this.addToParsedList('byNextDay', thisStartDate, thisEvent.id)

          // TODO: redundant propertiers that should be refactored (kenny 2023.07.02)
          this.addToParsedList('byContinuedNextDay', thisEvent.end.dateObject.toISODate(), thisEvent.id)
          this.addToParsedList('byStartDate', thisEvent.end.dateObject.toISODate(), thisEvent.id)
        }
      }
    },

    parseEventList: function () {
      this.clearParsed()
      for (let thisEvent of this.eventArray) {
        this.parsed.byId[thisEvent.id] = thisEvent
        this.createEventDateTimes(thisEvent)

        const thisStartDate = thisEvent.start.dateObject
        const thisEndDate = thisEvent.end.dateObject

        // get all-day events
        if (this.isEventAllDay(thisEvent) || this.getEventDuration(thisStartDate, thisEndDate, 'days') > 1) {
          this.addMultiDayEvents(thisEvent)
        }
        else {
          // get events with a start and end time
          this.addSingleDayEvent(thisEvent, thisStartDate.toISODate())
        }
      }

      // sort all day events
      for (let thisDate in this.parsed.byAllDayObject) {
        this.parsed.byAllDayObject[thisDate].sort(this.sortPairOfAllDayObjects)
      }
      this.buildAllDaySlotArray()
      for (let thisDate in this.parsed.byStartDate) {
        this.parsed.byStartDate[thisDate] = this.sortDateEvents(this.parsed.byStartDate[thisDate])
        this.parseDateEvents(this.parsed.byStartDate[thisDate])
      }
    },

    addToParsedList: function (listName, thisDate, whatToPush) {
      if (!dashHas(this.parsed[listName], thisDate)) {
        this.parsed[listName][thisDate] = []
      }
      this.parsed[listName][thisDate].push(whatToPush)
    },
    sortPairOfAllDayObjects: function (eventA, eventB) {
      if (eventA.daysFromStart < eventB.daysFromStart) return 1
      if (eventA.daysFromStart > eventB.daysFromStart) return -1
      // okay, so daysFromStart are equal, now look at duration
      if (eventA.durationDays > eventB.durationDays) return 1
      if (eventA.durationDays < eventB.durationDays) return -1
      // daysFromStart are equal, so just take the first one
      return 0
    },

    sortPairOfDateEvents: function (eventA, eventB) {
      // return date.getDateDiff(
      //   date.addToDate(eventA.start.dateObject, { milliseconds: eventA.durationMinutes }),
      //   date.addToDate(eventB.start.dateObject, { milliseconds: eventB.durationMinutes })
      // )
      return eventB.start.dateObject
        .plus({ milliseconds: eventA.durationMinutes })
        .diff(
          eventB.start.dateObject.plus({ milliseconds: eventA.durationMinutes })
        )
        .as('days')
    },

    sortDateEvents: function (eventArray) {
      let tempArray = []
      for (let eventId of eventArray) {
        tempArray.push(this.parsed.byId[eventId])
      }
      tempArray.sort(this.sortPairOfDateEvents)
      let returnArray = []
      for (let thisEvent of tempArray) {
        returnArray.push(thisEvent.id)
      }
      return returnArray
    },

    parseDateEvents: function (eventArray) {
      let columnArray = [[]]
      let gridTimeMap = new Map()
      for (let eventId of eventArray) {
        let thisEvent = this.parsed.byId[eventId]

        let gridTimes = this.getGridTimeSlots(thisEvent)
        for (let gridCounter = gridTimes.start; gridCounter <= gridTimes.end; gridCounter++) {
          if (gridTimeMap.has(gridCounter)) {
            gridTimeMap.set(gridCounter, gridTimeMap.get(gridCounter) + 1)
          }
          else {
            gridTimeMap.set(gridCounter, 1)
          }
        }

        let foundAColumn = false
        for (let columnIndex in columnArray) {
          if (this.hasSlotForEvent(thisEvent, columnArray[columnIndex])) {
            columnArray[columnIndex].push(thisEvent)
            foundAColumn = true
            break
          }
        }
        if (!foundAColumn) {
          columnArray.push([thisEvent])
        }
      }
      // let numberOfColumns = columnArray.length
      for (let columnIndex in columnArray) {
        for (let thisEvent of columnArray[columnIndex]) {
          // thisEvent.numberOfOverlaps = numberOfColumns - 1
          thisEvent.numberOfOverlaps = this.getMaxOfGrid(thisEvent, gridTimeMap) - 1
          thisEvent.overlapIteration = parseInt(columnIndex) + 1
        }
      }
      // make column count corrections for overlapping events that overlap with other events. Confusing.
      for (let eventId of eventArray) {
        let thisEvent = this.parsed.byId[eventId]
        thisEvent.numberOfOverlaps = this.getMaxOverlapsForEvent(thisEvent, eventArray)
      }
    },

    buildAllDaySlotArray: function () {
      let slotAssignments = {}

      let dateArray = Object.keys(this.parsed.byAllDayObject).sort()
      for (let thisDate of dateArray) {
        if (!dashHas(slotAssignments, thisDate)) {
          slotAssignments[thisDate] = {}
        }

        // go through each element on that date
        for (let thisAllDayObject of this.parsed.byAllDayObject[thisDate]) {
          if (!dashHas(thisAllDayObject, 'slot')) {
            let thisEventId = thisAllDayObject.id
            // find the first empty slot in the first day
            let slotToUse = 0
            let slotFound = false
            while (!slotFound) {
              if (dashHas(slotAssignments[thisDate], slotToUse)) {
                slotToUse++
              }
              else {
                slotFound = true
              }
            }
            // now fill that slot for each successive day
            for (let dayAdd = 0; dayAdd < thisAllDayObject.durationDays; dayAdd++) {
              let innerStartDate = DateTime.fromISO(thisDate + 'T00:00:00')
                .plus({ days: dayAdd })
                .toISODate()
              if (!dashHas(slotAssignments, innerStartDate)) {
                slotAssignments[innerStartDate] = {}
              }
              slotAssignments[innerStartDate][slotToUse] = thisEventId
              // go through each element on that date
              for (let thisDateElementIndex in this.parsed.byAllDayObject[innerStartDate]) {
                let thisDateElement = this.parsed.byAllDayObject[innerStartDate][thisDateElementIndex]
                if (thisDateElement.id === thisEventId) {
                  this.parsed.byAllDayObject[innerStartDate][thisDateElementIndex]['slot'] = slotToUse
                  break
                }
              }
            }
          }
        }
      }
    },
    eventsOverlap: function (event1, event2) {
      // const interval1 = this.getIntervalFromEvent(event1)
      // const interval2 = this.getIntervalFromEvent(event2)
      // return interval1.overlaps(interval2)
      return this.getIntervalFromEvent(event1).overlaps(this.getIntervalFromEvent(event2))
    },
    getIntervalFromEvent: function (thisEvent) {
      return Interval.fromDateTimes(
        thisEvent.start.dateObject,
        thisEvent.end.dateObject
      )
    },
    getMaxOverlapsForEvent: function (testEvent, eventArray) {
      let maxOverlaps = testEvent.numberOfOverlaps
      for (let eventId of eventArray) {
        const thisEvent = this.parsed.byId[eventId]
        if (this.eventsOverlap(testEvent, thisEvent)) {
          if (thisEvent.numberOfOverlaps > testEvent.numberOfOverlaps) {
            maxOverlaps = thisEvent.numberOfOverlaps
          }
        }
      }
      return maxOverlaps
    },
    hasSlotForEvent: function (checkEvent, existingEvents = []) {
      let slotAvailable = true
      for (let thisEvent of existingEvents) {
        if (
          // case 1: top of checkEvent overlaps bottom of thisEvent
          checkEvent.start.dateObject >= thisEvent.start.dateObject &&
          checkEvent.start.dateObject < thisEvent.end.dateObject
        ) {
          slotAvailable = false
          break
        }
        else if (
          // case 2: bottom of checkEvent overlaps top of thisEvent
          checkEvent.end.dateObject > thisEvent.start.dateObject &&
          checkEvent.end.dateObject <= thisEvent.end.dateObject
        ) {
          slotAvailable = false
          break
        }
        else if (
          // case 3: checkEvent falls inside of thisEvent
          checkEvent.start.dateObject >= thisEvent.start.dateObject &&
          checkEvent.end.dateObject <= thisEvent.end.dateObject
        ) {
          slotAvailable = false
          break
        }
        else if (
          // case 4: checkEvent encompasses all of thisEvent
          checkEvent.start.dateObject <= thisEvent.start.dateObject &&
          checkEvent.end.dateObject >= thisEvent.end.dateObject
        ) {
          slotAvailable = false
          break
        }
      }
      return slotAvailable
    },

    getGridTimeSlots: function (thisEvent) {
      return {
        start: this.getGridTime(thisEvent.start.dateObject, false),
        end: this.getGridTime(thisEvent.end.dateObject, true) - 1
      }
    },
    getGridTime: function (dateObject, roundUp = false) {
      dateObject = this.makeDT(dateObject) // just in case
      const gridCalc = ((dateObject.hour * 60) + dateObject.minute) / gridBlockSize
      if (roundUp) {
        return Math.ceil(gridCalc)
      }
      else {
        return Math.floor(gridCalc)
      }
    },
    getMaxOfGrid: function (thisEvent, gridTimeMap) {
      // TODO: there's probably a fancier Collections way to do this
      let max = 0
      const gridTimes = this.getGridTimeSlots(thisEvent)
      for (let gridCounter = gridTimes.start; gridCounter <= gridTimes.end; gridCounter++) {
        if (gridTimeMap.has(gridCounter) && gridTimeMap.get(gridCounter) > max) {
          max = gridTimeMap.get(gridCounter)
        }
      }
      return max
    },

    parseGetDurationMinutes: function (eventObj) {
      if (eventObj.start.isAllDay) {
        return 24 * 60
      }
      else {
        return eventObj.end.dateObject.diff(
          eventObj.start.dateObject,
          'minutes'
        )
      }
    },
    getPassedInEventArray: function () {
      if (this.eventArray !== undefined && this.eventArray.length > 0) {
        this.parseEventList()
        return true
      }
      else {
        return false
      }
    },
    isEventArrayEmpty: function () {
      return !(this.eventArray !== undefined && this.eventArray.length > 0)
    },
    handlePassedInEvents: function () {
      if (!this.isEventArrayEmpty()) {
        this.getPassedInEventArray()
      }
    },
    handleEventUpdate: function (eventObject) {
      if (dashHas(this._props, 'fullComponentRef') && this._props.fullComponentRef) {
        // this component has a calendar parent, so don't move forward
        return
      }
      let thisEventId = eventObject.id
      // update eventArray
      for (let thisEventIndex in this.eventArray) {
        if (this.eventArray[thisEventIndex].id === thisEventId) {
          this.eventArray[thisEventIndex] = eventObject
          this.parseEventList()
        }
      }
    }
  },
  mounted () {}
}
