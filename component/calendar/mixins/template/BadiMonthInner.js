import { DateTime } from 'luxon'
import BadiDate from 'utils/badidate'
import { getFirstDayOfWeek } from '../../../../utils/startofweek'

const debug = require('debug')('calendar:BadiMonthInner')

export default {
  props: {
    startDate: {
      type: [Object, BadiDate],
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
      const weekArray = [new Array(7), new Array(7), new Array(7), new Array(7)]

      // get start of month
      const monthStartDay = new BadiDate(
        {
          year: yearNumber,
          month: monthNumber,
          day: 1
        }
      )
      let currentDay = getFirstDayOfWeek(monthStartDay)

      const mapArray = weekArray.map((element) => {
        return [...element].map((element) => {
          const day = {
            dateObject: currentDay,
            year: currentDay.year,
            month: currentDay.month,
            date: currentDay.day,
            dayName: currentDay.format('WW'),
            dayNumber: currentDay.weekday
          }
          currentDay = currentDay.plus({ days: 1 })
          return day
        })
      })
      return mapArray
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
