import { createWrapper, shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import { CalendarMonthInner } from 'components'
import Quasar from '../utils'

import { DateTime } from 'luxon'

// default module is on named default property of export object
import CalendarEventMixin from 'mixins/code/CalendarEventMixin'
jest.mock('mixins/code/CalendarEventMixin')

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
        },
        mixins: [CalendarEventMixin.default]
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
      wrapper.destroy()
    })

    it('getCalendarCellArray - should return correct beginning of month', () => {
      const vm = wrapper.vm
      const startDate = vm.$props.startDate

      const date = DateTime.now().startOf('month').setLocale('en-US')
      const dayObject = {
        dateObject: date,
        year: date.year,
        month: date.month,
        date: date.day,
        dayName: date.toFormat('EEEE'),
        dayNumber: date.weekday
      }

      const weekArray = vm.getCalendarCellArray(startDate.month, startDate.year)

      expect(weekArray.length).toBeGreaterThan(1)
      expect(weekArray[0][0]).toEqual(dayObject)
    })
  })
})
