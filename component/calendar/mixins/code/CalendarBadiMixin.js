/**
 * @fileoverview Shared props and methods for Badi templates
 */
import { badiDateSettings } from 'badidate'
import BadiDate from '../../../../utils/badidate'

export default {
  props: {
    saturdayFirstDayOfWeek: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    /**
     * Creates a formatted Badi date for use in the calendar.
     *
     * @param {BadiDate} dateObject A BadiDate object
     * @param {string} formatString A formatting token
     *
     * @returns {string} A formatted Badi date
     */
    formatDateBadi: function (dateObject, formatString) {
      if (dateObject instanceof BadiDate) {
        return dateObject.format(formatString)
      }
      else {
        throw TypeError('"dateObject" not instance of BadiDate')
      }
    },
    /**
     * Return true if weekday of date is Jalal
     *
     * @param {BadiDate} dateObject
     * @returns {boolean}
     */
    isJalal: function (dateObject) {
      const dayNumber = dateObject.weekday
      return (dayNumber === 1)
    }
  },
  created () {
    badiDateSettings({
      defaultLanguage: this.$props.calendarLocale
    })
  },
  mounted () {}
}
