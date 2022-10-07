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

    moveToDisplayZone: function (dateObject) {
      return this.makeDT(dateObject, this.calendarTimezone)
    },

    /**
     * Adjust the dates of an event according to ${SET_OF_RULES}
     * TODO: Please define SET_OF_RULES (gregw, 2022.09.27)
     * @param event event whose dates will be adjusted
     */
    adjustEventDates: function(event) {

      // TODO: Document what is the signifcance of the event.start dashHas'ing a 'date' (gregw, 2022.09.27)
      if (dashHas(event.start, 'date')) { //

        // TODO:  Looks like we are moving the ISO version of the start of the start date to the display zone.
        //        I have no idea what that means. Please expound (gregw, 2022.09.27)
        event.start['dateObject'] = this.moveToDisplayZone(
          DateTime.fromISO(event.start.date).startOf('day')
        )
        // TODO:  Looks like we are moving the ISO version of the end of the end date to the display zone.
        //        I have no idea what that means. Please expound (gregw, 2022.09.27)
        event.end['dateObject'] = this.moveToDisplayZone(
          DateTime.fromISO(event.end.date).endOf('day')
        )
        // TODO:  Presumably by this point we have created a range from the the first second of the start date
        //        until the last of the end date. Is this correct? Please confirm. (gregw, 2022.09.27)

        // Set the start object's all day flag to
        event.start['isAllDay'] = true
        event['durationDays'] = Math.ceil(
          event.end.dateObject
            .diff(event.start.dateObject)
            .as('days')
        )
      }
      else {
        /* NB:  Assumption is objects are passed by reference not by value.
         *      (gregw, 2202.09.27)
         */

        // start date
        this.cleanseEventStartOrEnd(event.start)

        // end date
        this.cleanseEventStartOrEnd(event.end)
      }
    },

    /**
     * Adjust a date with a pre-existing time zone according to ${SET_OF_RULES}
     * TODO: Please define SET_OF_RULES
     * @param date date to be adjusted
     */
    adjustDateTimeZone: function(date) {
      if (dashHas(date, 'timeZone')) {
        // convert to local timezone
        date.dateObject = date.dateObject
          .setZone(date.timeZone, { keepLocalTime: true })
          .toLocal()
        delete date.timeZone
        date.dateTime = date.dateObject.toISO() // fix time zone
      }
    },

     /**
     * Adjust the start or end objects for an event that does not have a "date" field.
     * TODO:  Consider abstract the startOrEnd object into its own class (eventLimit, say?)
     *        Then a lot of the adjust methods I've abstracted could be encapsulated in this
     *        new class, which would handle all this conversion logic internally, providing
     *        a simple interface here. (gregw, 2022.09.27)
     * @param startOrEnd  object to be adjusted.
     */
    cleanseEventStartOrEnd: function(startOrEnd) {
      startOrEnd['dateObject'] = DateTime.fromISO(startOrEnd.dateTime)
      this.adjustDateTimeZone(startOrEnd)
      startOrEnd.dateObject = this.moveToDisplayZone(startOrEnd.dateObject)
    },

    adjustEventDuration: function(event) {
      // put in duration for multiday events with an associated time
      // Consider an if/else ladder
      if (event.start['isAllDay']) {

      }
      else if (event.start.dateObject.toISODate() !== event.end.dateObject.toISODate()) {
        event['durationDays'] = Math.ceil(
          event.end.dateObject
            .diff(event.start.dateObject)
            .as('days')
        )

        // TODO:  Consider breaking the following into a method on the event object
        //        (gregw, 2022.09.27)
        if (event['durationDays'] > 2) {
          event['timeSpansMultipleDays'] = true
        }
        else {
          event['timeSpansOvernight'] = true
        }
      }
    },

    addMultiDayEvents: function(event) {
      for (let dayAdd = 0; dayAdd < event.durationDays; dayAdd++) {
        let innerStartDate = event.start.dateObject
          .plus({ days: dayAdd })
          .toISODate()
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

    addSingleDayEvent: function(thisEvent) {
      thisEvent.durationMinutes = this.parseGetDurationMinutes(thisEvent)
      this.addToParsedList('byStartDate', thisStartDate, thisEvent.id)

      if (thisEvent.start.dateObject.toISODate() !== thisEvent.end.dateObject.toISODate()) {
        // this is a date where the time is set and spans across more than one day

        if (this.getEventDuration(thisEvent) > 1) {
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
          this.addToParsedList('byContinuedNextDay', thisEvent.end.dateObject.toISODate(), thisEvent.id)
          this.addToParsedList('byStartDate', thisEvent.end.dateObject.toISODate(), thisEvent.id)
        }
      }
    },

    parseEventList: function () {
      this.clearParsed()
      for (let thisEvent of this.eventArray) {
        this.parsed.byId[thisEvent.id] = thisEvent
        this.adjustEventDates(thisEvent)
        this.adjustEventDuration(thisEvent)

        let thisStartDate = thisEvent.start.dateObject.toISODate()
        // get all-day events
        if (thisEvent.start.isAllDay || this.getEventDuration(thisEvent) > 1) {
          this.addMultiDayEvents(thisEvent)
        }
        else {
          // get events with a start and end time
          this.addSingleDayEvent(thisEvent)
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
