/**
 * @fileoverview Shared methods for interfacing with the BadiDate API
 */
import BadiDate from '../../../../utils/badidate'

export default {
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
  mounted () {}
}
