import DateTime from 'luxon/src/datetime'

const debug = require('debug')('calendar:BadiMonthInner')

export default {
  methods: {
    /**
     * Generates cell data for a calendar month
     *
     * @param {integer} monthNumber
     * @param {integer} yearNumber
     *
     * @returns {Array<DateTime>}
     */
    getCalendarCellArray: function (monthNumber, yearNumber) {
      let currentDay = this.makeDT(
        DateTime.fromObject({
          year: yearNumber,
          month: monthNumber,
          day: 1
        })
      )
      let currentWeekOfYear = this.getWeekNumber(currentDay, this.sundayFirstDayOfWeek)
      let weekArray = []
      let currentWeekArray = []
      let thisDayObject = {}
      for (let thisDateOfMonth = 1; thisDateOfMonth <= 31; thisDateOfMonth++) {
        currentDay = this.makeDT(
          DateTime.fromObject({
            year: yearNumber,
            month: monthNumber,
            day: thisDateOfMonth
          })
        )
        if (
          currentDay.year === yearNumber &&
          currentDay.month === monthNumber
        ) {
          if (
            this.getWeekNumber(currentDay, this.sundayFirstDayOfWeek) !== currentWeekOfYear
          ) {
            weekArray.push(currentWeekArray)
            currentWeekOfYear = this.getWeekNumber(currentDay, this.sundayFirstDayOfWeek)
            currentWeekArray = []
          }
          thisDayObject = {
            dateObject: currentDay,
            year: currentDay.year,
            month: currentDay.month,
            date: currentDay.day,
            dayName: currentDay.toFormat('EEEE'),
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
        startDate: startDateObj.toISODate(),
        endDate: endDateObj.toISODate(),
        numDays: Math.ceil(endDateObj.diff(startDateObj).as('days') + 1),
        viewType: this.$options.name
      }
    }
  },
  mounted () {
    debug('Component mounted')
  }
}
