import { createWrapper, shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import { BadiMonthInner } from 'components'
import Quasar from '../utils'

import { DateTime } from 'luxon'
import BadiDate from '../../../utils/badidate'

// default module is on named default property of export object
import CalendarEventMixin from 'mixins/code/CalendarEventMixin'
jest.mock('mixins/code/CalendarEventMixin')

describe('BadiMonthInner', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component methods', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallowMount(BadiMonthInner, {
        LocalVue,
        propsData: {
          startDate: new BadiDate(DateTime.local())
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

      const badidate = new BadiDate({
        year: startDate.year,
        month: startDate.month,
        day: 1
      })
      const dayObject = {
        dateObject: badidate,
        year: badidate.year,
        month: badidate.month,
        date: badidate.day,
        dayName: badidate.format('WW'),
        dayNumber: badidate.weekday
      }

      const weekArray = vm.getCalendarCellArray(startDate.month, startDate.year)
      // weeks start on Jamal
      const index = (badidate.weekday - 2) % 7

      expect(weekArray[0][index]).toEqual(dayObject)
    })
  })
})
