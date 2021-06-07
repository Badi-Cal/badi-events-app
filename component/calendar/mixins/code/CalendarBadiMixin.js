/**
 * @fileoverview Shared properties for Badi templates
 */
import { BadiDate } from 'badidate'

export default {
  props: {
    calendarName: {
      type: String,
      default: 'Badi'
    },
    saturdayFirstDayOfWeek: {
      type: Boolean,
      default: false
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
    }
  },
  computed: {
    /**
     * Sets BadiDate object for this instance
     *
     * @returns {BadiDate}
     */
    workingDateBadi: function () {
      return new BadiDate(this.workingDate)
    }
  },
  data () {},
  mounted () {}
}
