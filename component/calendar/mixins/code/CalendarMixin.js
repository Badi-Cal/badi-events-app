/**
 * @fileoverview Shared methods across all calendar components
 */

import BadiDate from 'utils/badidate'
import dashHas from 'lodash.has'
import { DateTime } from 'luxon'
import { tokensBadi, tokensLuxon } from '../../../../utils/formatter'
import { getFirstDayOfWeek, getFirstWeekDay } from '../../../../utils/startofweek'

// const debug = require('debug')('calendar:CalendarMixin')
export default {
  computed: {},
  methods: {
    handleStartChange: function (val, oldVal) {
      this.doUpdate()
    },
    /**
     * Converts a JavaScript Date object to a Luxon DateTime
     * object
     *
     * @param {Date} dateObject
     * @param {string} adjustTimezone
     *
     * @returns {DateTime} A Luxon DateTime object
     */
    makeDT: function (dateObject, adjustTimezone) {
      if (typeof dateObject === 'undefined') {
        return null
      }
      if (dateObject instanceof Date) {
        dateObject = DateTime.fromJSDate(dateObject)
      }
      if (
        this.calendarLocale &&
        (!dashHas(dateObject, 'locale') || this.calendarLocale !== dateObject.locale)
      ) {
        dateObject = dateObject.setLocale(this.calendarLocale)
      }
      if (adjustTimezone && adjustTimezone !== dateObject.zoneName) {
        dateObject = dateObject.setZone(this.calendarTimezone)
      }
      return dateObject
    },
    triggerEventClick: function (eventObject, eventRef) {
      this.$root.$emit(
        'click-event-' + eventRef,
        eventObject
      )
    },
    triggerDayClick: function (dateObject, eventRef) {
      this.$root.$emit(
        'click-day-' + eventRef, {
          day: dateObject.toObject()
        }
      )
    },
    triggerDisplayChange: function (eventRef, payload) {
      if (this.fullComponentRef) {
        // this component is part of a parent calendar, so look at current tab
        payload['visible'] = this.$parent.active
        payload['tabName'] = this.$parent.name
      }
      else {
        payload['visible'] = true
      }
      this.$root.$emit(
        'display-change-' + eventRef,
        payload
      )
    },
    handleEventDetailEvent: function (params, thisRef) {
      if (!this.preventEventDetail) {
        if (thisRef === undefined) {
          thisRef = 'defaultEventDetail'
        }
        this.eventDetailEventObject = params
        if (dashHas(this.$refs, thisRef + '.__open')) {
          this.$refs[thisRef].__open()
        }
        else if (dashHas(this.$parent.$refs, thisRef + '.__open')) {
          this.$parent.$refs[thisRef].__open()
        }
        else if (dashHas(this, thisRef + '.__open')) {
          this[thisRef].__open()
        }
      }
    },
    fullMoveToDay: function (dateObject) {
      if (this.fullComponentRef) {
        this.$root.$emit(
          this.fullComponentRef + ':moveToSingleDay', {
            dateObject: dateObject
          }
        )
      }
    },
    getEventColor: function (eventObject, colorName) {
      if (dashHas(eventObject, colorName)) {
        return eventObject[colorName]
      }
      else if (dashHas(this, colorName)) {
        return this[colorName]
      }
      else if (colorName === 'textColor') {
        return 'white'
      }
      else {
        return 'primary'
      }
    },
    addCssColorClasses: function (cssObject, eventObject) {
      cssObject['bg-' + this.getEventColor(eventObject, 'color')] = true
      cssObject['text-' + this.getEventColor(eventObject, 'textColor')] = true
      return cssObject
    },
    /**
     * Return formatted date string for BadiDate or DateTime object.
     * @see https://moment.github.io/luxon/#/formatting?id=presets
     *
     * @param {BadiDate|DateTime} dateObject
     * @param {string} format A preset formatting string
     * @returns {string}
     */
    toDateFormat: function (dateObject, format) {
      if (dateObject instanceof BadiDate) {
        return this.formatDateBadi(dateObject, tokensBadi[format])
      }

      return dateObject.toLocaleString(tokensLuxon[format])
    },
    /**
     * Return formatted date string Date object.
     *
     * @param {Object} dateObject
     * @param {string} format A preset formatting string
     * @param {boolean} usePredefined
     * @returns {string}
     */
    formatDate: function (dateObject, format, usePredefined) {
      if (usePredefined) {
        return this.makeDT(dateObject).toLocaleString(DateTime[format])
      }
      else {
        return this.makeDT(dateObject).toFormat(format)
      }
    },
    dateAdjustWeekday (thisDateObject, weekdayNum) {
      thisDateObject = this.makeDT(thisDateObject)
      let checkDate = DateTime.local()
      let adjustForward = true
      if (weekdayNum < 1) {
        adjustForward = false
        weekdayNum = Math.abs(weekdayNum)
        // never reached condition?
        if (weekdayNum === 0) {
          weekdayNum = 7
        }
      }

      for (let counter = 1; counter <= 7; counter++) {
        if (adjustForward) {
          // add counter to current date object
          checkDate = thisDateObject.plus({ days: counter })
        }
        else {
          // substract counter from current date object
          checkDate = thisDateObject.minus({ days: counter })
        }
        if (checkDate.weekday === weekdayNum) {
          return checkDate
        }
      }
    },
    /**
     * Array of days in the week
     *
     * @param {integer} numberOfDays
     * @returns {Array<DateTime}
     */
    buildWeekDateArray: function (numberOfDays) {
      if (numberOfDays === undefined) {
        if (this.numberOfDays !== undefined) {
          numberOfDays = this.numberOfDays
        }
        else if (this.numDays !== undefined) {
          numberOfDays = this.numDays
        }
        else {
          numberOfDays = 7
        }
      }
      return this.getWeekDateArray(numberOfDays)
    },
    getForcedWeekBookendDates: function (numberOfDays) {
      const locale = this.startDate.locale
      const sundayFirstDayOfWeek = getFirstWeekDay(locale)
      if (numberOfDays === undefined) {
        numberOfDays = 7
      }
      if (sundayFirstDayOfWeek) {
        return {
          first: this.dateAdjustWeekday(this.startDate, -1).minus({ days: 1 }),
          last: this.dateAdjustWeekday(this.startDate, numberOfDays).minus({ days: 1 })
        }
      }
      else {
        return {
          first: this.dateAdjustWeekday(this.startDate, -1),
          last: this.dateAdjustWeekday(this.startDate, numberOfDays)
        }
      }
    },
    getWeekDateArray: function (numberOfDays) {
      let returnArray = []
      let startOfWeek = getFirstDayOfWeek(this.startDate)
      for (let counter = 0; counter <= numberOfDays - 1; counter++) {
        returnArray.push(
          startOfWeek.plus({ days: counter })
        )
      }
      return returnArray
    },
    formatTimeFromNumber: function (hourNumber, minuteNumber = 0) {
      // TODO: this should be able to handle 24 hour and alternate time formats
      let tempDate = this.makeDT(DateTime.fromObject({ hour: hourNumber, minute: minuteNumber }))
      let localeFormattedHour = tempDate.toLocaleString(DateTime.TIME_SIMPLE)
      if (minuteNumber === 0 && localeFormattedHour.includes('M')) {
        localeFormattedHour = localeFormattedHour.replace(/:[0-9][0-9]/, '')
      }
      return localeFormattedHour
        .replace(' ', '')
        .toLowerCase()
    },
    simplifyTimeFormat: function (timeString, removeMeridiem) {
      if (removeMeridiem) {
        timeString = timeString.replace(/[AP]M/i, '')
      }
      return timeString
        .replace(':00', '')
        .replace(' ', '')
        .toLowerCase()
    },
    setTimePeriod: function (params) {
      this.workingDate = params.dateObject
    },
    handleDateChange: function (params) {
      let dateObject = null
      if (dashHas(params, 'dateObject')) {
        dateObject = params.dateObject
      }
      else {
        dateObject = params
      }
      this.workingDate = this.makeDT(dateObject)
      this.triggerDisplayChange(
        this.eventRef,
        {
          newDate: this.workingDate
        }
      )
    },

    getDayOfWeek: function () {
      return this.createThisDate(this.dayNumber).format('dddd')
    },
    createThisDate: function (dateNum) {
      return this.parseDateParams(dateNum)
    },
    /**
     * True if date is same as today
     *
     * @param {DateTime|BadiDate} thisDateObject
     * @returns {boolean}
     */
    isCurrentDate: function (thisDateObject) {
      const today = DateTime.local()

      if (thisDateObject instanceof BadiDate) {
        const badiDate = new BadiDate(today)
        return badiDate.equals(thisDateObject)
      }

      return today.hasSame(
        thisDateObject,
        'day'
      )
    },
    /**
     * True if date has same month as working date
     *
     * @param {DateTime|BadiDate} dateObject
     * @returns {boolean}
     */
    isCurrentMonth: function (dateObject) {
      const workingDate = this.startDate

      return (
        workingDate.month === dateObject.month
      )
    },
    /**
     * Return true if days is weekend day.
     *
     * @param {DateTime|BadiDate} thisDateObject
     * @returns {boolean}
     */
    isWeekendDay: function (thisDateObject) {
      const dayNumber = thisDateObject.weekday

      if (thisDateObject instanceof BadiDate) {
        return (dayNumber === 1 || dayNumber === 2)
      }

      return (dayNumber === 6 || dayNumber === 7)
    },
    /**
     * Adjusts for Sunday as the first day of the week.
     *
     * Weeks start on Monday.
     *
     * @param {DateTime} thisDateObject
     * @returns {integer}
     */
    getWeekNumber (thisDateObject) {
      const locale = thisDateObject.locale
      const useSundayStart = getFirstWeekDay(locale)
      if (useSundayStart === 0) {
        return this.makeDT(thisDateObject).plus({ days: 1 }).weekNumber
      }
      else {
        return this.makeDT(thisDateObject).weekNumber
      }
    },
    mountSetDate: function () {
      let newDate = this.makeDT(this.startDate)
      this.$emit(
        'set-working-date-' + this.eventRef,
        newDate
      )
    },
    decimalAdjust: function (type, value, exp) {
      // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
      // If the exp is undefined or zero...
      if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value)
      }
      value = +value
      exp = +exp
      // If the value is not a number or the exp is not an integer...
      if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN
      }
      // Shift
      value = value.toString().split('e')
      value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)))
      // Shift back
      value = value.toString().split('e')
      return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp))
    },
    calculateDayCellWidth: function (numberOfDays) {
      return this.decimalAdjust(
        'floor',
        100 / numberOfDays,
        -3
      ) + '%'
    },
    createNewNavEventName: function () {
      return 'calendar:navMovePeriod:' + this.createRandomString()
    },
    createRandomString: function () {
      return Math.random().toString(36).substring(2, 15)
    },
    getEventIdString: function (eventObj) {
      if (dashHas(eventObj, 'id')) {
        if (typeof eventObj.id === 'number') {
          return eventObj.id.toString()
        }
        else if (typeof eventObj.id === 'string') {
          return eventObj.id
        }
        else {
          return '' + eventObj.id
        }
      }
      else {
        return 'NOID' + this.createRandomString()
      }
    },
    getDayHourId: function (eventRef, workingDate, thisHour) {
      return eventRef +
        '-' +
        this.makeDT(workingDate).toISODate() +
        '-hour-' +
        thisHour
    },
    /**
     * Validates object is DateTime or BadiDate
     *
     * @param {object} dateObject
     * @returns {boolean}
     */
    isCalendarDate: function (dateObject) {
      if (DateTime.isDateTime(dateObject)) {
        return true
      }
      if (dateObject instanceof BadiDate) {
        return true
      }
      throw TypeError('Invalid date object type')
    }

  },
  mounted () {}
}
