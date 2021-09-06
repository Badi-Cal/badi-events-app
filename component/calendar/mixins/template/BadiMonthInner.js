import DateTime from 'luxon/src/datetime'
import { BadiDate } from 'badidate'

const debug = require('debug')('calendar:BadiMonthInner')

export default {
  props: {
    startDate: {
      type: [BadiDate],
      default: () => { return new BadiDate(DateTime.local()) }
    }
  },
  methods: {
    /**
     * Generates cell data for a calendar month
     *
     * @param {integer} monthNumber Badi month
     * @param {integer} yearNumber Badi year
     *
     * @returns {Array<BadiDate}
     */
    getCalendarCellArray: function (monthNumber, yearNumber) {
      let weekArray = [],
        currentWeekArray = [],
        thisDayObject = {},
        currentDay = {}

      for (let thisDateOfMonth = 1; thisDateOfMonth <= 19; thisDateOfMonth++) {
        currentDay = new BadiDate(
          {
            year: yearNumber,
            month: monthNumber,
            day: thisDateOfMonth
          }
        )
        if (
          currentDay.year === yearNumber &&
          currentDay.month === monthNumber
        ) {
          if (
            this.isJalal(currentDay)
          ) {
            weekArray.push(currentWeekArray)
            currentWeekArray = []
          }
          thisDayObject = {
            dateObject: currentDay,
            year: currentDay.year,
            month: currentDay.month,
            date: currentDay.day,
            dayName: currentDay.format('WW'),
            dayNumber: currentDay.weekday
          }
          currentWeekArray.push(thisDayObject)
        }
      }
      if (weekArray.length > 0) {
        weekArray.push(currentWeekArray)
      }
      return weekArray
    },
    /**
     * Takes a weekArray and figures out the values to send for a page display event
     *
     * @param {Array} weekArray
     * @returns {Object}
     */
    getWeekArrayDisplayDates: function (weekArray) {
      let startDateObj = weekArray[0][0].dateObject
      const lastWeek = weekArray[weekArray.length - 1]
      let endDateObj = lastWeek[lastWeek.length - 1].dateObject
      return {
        startDate: startDateObj.format('y-mm-dd'),
        endDate: endDateObj.format('y-mm-dd'),
        numDays: undefined,
        viewType: this.$options.name
      }
    }
  },
  mounted () {
    debug('Component mounted')
  }
}
