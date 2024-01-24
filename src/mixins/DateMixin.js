/**
 * @fileoverview  Methods for converting dates
 */

import BadiDate from 'utils/badidate'
import dashHas from 'lodash.has'
import { DateTime } from 'luxon'

export default {
  computed: {
    startDateBadi: function () {
      return new BadiDate({
        year: this.year,
        month: this.month,
        day: this.day
      })
    },
    startDateGregorian: function () {
      return this.makeDT({
        year: this.year,
        month: this.month,
        day: this.day
      })
    }
  },
  methods: {
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
      if (dateObject instanceof Date) {
        dateObject = DateTime.fromJSDate(dateObject)
      }
      if (typeof dateObject === 'object') {
        dateObject = DateTime.fromObject(dateObject)
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
    }
  }
}
