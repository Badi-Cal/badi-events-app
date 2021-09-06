import { createWrapper, shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import { CalendarMonthInner } from 'components'
import Quasar from '../utils'

import DateTime from 'luxon/src/datetime'

describe('CalendarMonthInner', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component methods', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallowMount(CalendarMonthInner, {
        LocalVue,
        propsData: {
          startDate: DateTime.local()
        }
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('generateCalendarCellArray - should return correct beginning of month', () => {
      const vm = wrapper.vm

      const date = DateTime.now().startOf('month').setLocale('en-US')
      const dayObject = {
        dateObject: date,
        year: date.year,
        month: date.month,
        date: date.day,
        dayName: date.toFormat('EEEE'),
        dayNumber: date.weekday
      }
      const weekArray = vm.generateCalendarCellArray()

      expect(weekArray.length).toBeGreaterThan(1)
      expect(weekArray[0][0]).toEqual(dayObject)
    })
  })
})
